import { redirect, type Actions, fail } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { HttpStatusCode } from '$lib/statusCodes';
import type { ClientResponseError } from 'pocketbase';
import { LOGIN_PATH } from '$lib/constant';
export const load = (async ({ locals }) => {
	// if user is logged in, send them back to home
	if (locals.pb.authStore.isValid) throw redirect(HttpStatusCode.SEE_OTHER, '/');
}) satisfies PageServerLoad;

interface FormResError {
	code: FormFieldKey | 'unknown';
	message: string;
}
enum FormFieldKey {
	Name = 'name',
	Email = 'email',
	Password = 'password',
	PasswordConfirm = 'passwordConfirm'
}
const makeErrObj = (message = '', code: FormFieldKey | 'unknown' = 'unknown'): FormResError => ({
	code,
	message
});

export const actions = {
	register: async ({ locals, request }) => {
		const formData = await request.formData();
		const name = formData.get(FormFieldKey.Name)?.toString();
		const email = formData.get(FormFieldKey.Email)?.toString().toLowerCase();
		const password = formData.get(FormFieldKey.Password)?.toString();
		const passwordConfirm = formData.get(FormFieldKey.PasswordConfirm)?.toString();
		// validate emailOrUsername
		if (!email || email == '')
			return fail(HttpStatusCode.BAD_REQUEST, {
				name,
				email,
				error: makeErrObj('Empty Email Address', FormFieldKey.Email)
			});
		// validate password
		if (!password || password == '')
			return fail(HttpStatusCode.BAD_REQUEST, {
				name,
				email,
				error: makeErrObj('Empty Password', FormFieldKey.Password)
			});
		if (!passwordConfirm || passwordConfirm == '')
			return fail(HttpStatusCode.BAD_REQUEST, {
				name,
				email,
				error: makeErrObj('Empty Confirm Password', FormFieldKey.PasswordConfirm)
			});
		if (password != passwordConfirm)
			return fail(HttpStatusCode.BAD_REQUEST, {
				name,
				email,
				error: makeErrObj('Password and confirm password do not match', FormFieldKey.Password)
			});

		try {
			const newUSer = await locals.pb.collection('users').create({
				name,
				email,
				password,
				passwordConfirm
			});

			const { token, record } = await locals.pb
				.collection('users')
				.authWithPassword(email, password);
		} catch (err: unknown) {
			console.log('Error: ', err);
			const e = (err as ClientResponseError).response.data;
			// console.log(e); Output:
			// password: {
			// 		code: 'validation_length_out_of_range',
			// 		message: 'The length must be between 8 and 72.'
			// }
			const keys = [
				FormFieldKey.Name,
				FormFieldKey.Email,
				FormFieldKey.Password,
				FormFieldKey.PasswordConfirm
			];
			if (e !== undefined) {
				for (const key of keys) {
					console.log(e[key]);
					if (e[key] !== undefined) return { name, email, error: makeErrObj(e[key].message, key) };
				}
			}
			// if other unknwon error was sent by pocketbase
			return { name, email, error: makeErrObj('Something went wrong!', 'unknown') };
		}
		throw redirect(HttpStatusCode.SEE_OTHER, LOGIN_PATH);
	}
} satisfies Actions;

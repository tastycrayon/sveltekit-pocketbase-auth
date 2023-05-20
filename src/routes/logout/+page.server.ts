import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: ({ locals }) => {
		locals.pb.authStore.clear();
		locals.user = null;

		throw redirect(302, '/');
	}
};

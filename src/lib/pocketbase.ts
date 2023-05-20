import { invalidateAll } from '$app/navigation';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);

// callback is executed after successfull authentication
export const initGoogleAuth = async (callback = () => {}) => {
	// This method initializes a one-off realtime subscription and will
	// open a popup window with the OAuth2 vendor page to authenticate.
	//
	// Once the external OAuth2 sign-in/sign-up flow is completed, the popup
	// window will be automatically closed and the OAuth2 data sent back
	// to the user through the previously established realtime connection.
	try {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
		currentUser.set(pb.authStore.model);
		// if (authData) window.location.reload();
		if (authData) {
			invalidateAll();
			callback();
		}
		// console.log({ a: pb.authStore.isValid, b: pb.authStore.token, c: pb?.authStore?.model?.id });
	} catch (_) {}
};

// callback is executed after successfull authentication
export const initFacebookAuth = async (callback = () => {}) => {
	try {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'facebook' });
		currentUser.set(pb.authStore.model);
		// if (authData) window.location.reload();
		if (authData) {
			invalidateAll();
			callback();
		}
		// console.log({ a: pb.authStore.isValid, b: pb.authStore.token, c: pb?.authStore?.model?.id });
	} catch (_) {}
};

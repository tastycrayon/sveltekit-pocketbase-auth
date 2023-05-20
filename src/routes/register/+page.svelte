<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import { LOGIN_PATH } from '$lib/constant';
	import Google from '../../components/buttons/google.svelte';
	import Facebook from '../../components/buttons/facebook.svelte';
	import Separator from '../../components/separator.svelte';

	export let form: ActionData;
	$: error = form?.error;

	$: formatError = (key: string) => (error?.code == key ? error.message : '');
	$: setErrorClass = (keys: string[]) =>
		`input  ${error?.code && keys.includes(error.code) ? 'input-error' : ''}`;
</script>

<div class="card p-4 max-w-[400px] mx-auto space-y-4 my-4">
	<h1 class="h1">SIGN UP</h1>

	{#if error?.code == 'unknown'}<p class="text-error-500">{error.message}</p>{/if}
	<form
		class="space-y-3"
		method="POST"
		action="?/register"
		use:focusTrap={true}
		use:enhance={() =>
			async ({ result }) => {
				invalidateAll();
				await applyAction(result);
			}}
	>
		<label class="label">
			<small>Your Fullname</small>
			<input
				class={setErrorClass(['name'])}
				type="text"
				name="name"
				placeholder="John Doe"
				value={form?.name ?? ''}
			/>
			<small class="text-error-500">{formatError('name')}</small>
		</label>
		<label class="label">
			<small>Email Address</small>
			<input
				class={setErrorClass(['email'])}
				type="email"
				name="email"
				placeholder="johndoe@company.com"
				value={form?.email ?? ''}
				required
			/>
			<small class="text-error-500">{formatError('email')}</small>
		</label>
		<label class="label">
			<small>Password</small>
			<input
				class={setErrorClass(['password'])}
				type="password"
				name="password"
				placeholder="Password"
			/>
			<small class="text-error-500">{formatError('password')}</small>
		</label>
		<label class="label">
			<small>Confirm Password</small>
			<input
				class={setErrorClass(['passwordConfirm'])}
				type="password"
				name="passwordConfirm"
				placeholder="Must be same as password"
			/>
			<small class="text-error-500">{formatError('passwordConfirm')}</small>
		</label>
		<button type="submit" class="btn variant-filled">
			<span>SUBMIT</span>
		</button>
		<div class="w-full">
			<small>Already have an account? <a href={LOGIN_PATH} class="anchor">Sign in here</a></small>
		</div>
	</form>

	<Separator text="OR" />
	<div class="space-y-2">
		<Google />
		<Facebook />
	</div>
</div>

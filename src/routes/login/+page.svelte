<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import { REGISTER_PATH } from '$lib/constant';
	import Google from '../../components/buttons/google.svelte';
	import Facebook from '../../components/buttons/facebook.svelte';
	import Separator from '../../components/separator.svelte';
	import Icon from '../../icons/icon.svelte';

	export let form: ActionData;
	$: error = form?.error;
	$: formatError = (key: string) => (error?.code == key ? error.message : '');
	$: setErrorClass = (keys: string[]) =>
		`input  ${error?.code && keys.includes(error.code) ? 'input-error' : ''}`;

	let isPasswordVisible = false;
</script>

<div class="card p-4 max-w-[400px] mx-auto space-y-4 my-4">
	<h1 class="h1">SIGN IN</h1>

	{#if error?.code == 'unknown'}<p class="text-error-500">{error.message}</p>{/if}

	<form
		class="space-y-2"
		method="POST"
		action="?/login"
		use:focusTrap={true}
		use:enhance={() =>
			async ({ result }) => {
				invalidateAll();
				await applyAction(result);
			}}
	>
		<label class="label">
			<small>Email or Username</small>
			<input
				class={setErrorClass(['email', 'unknown'])}
				type="text"
				name="emailOrUsername"
				placeholder="Email or Username"
				value={form?.emailOrUsername ?? ''}
			/>
			<small class="text-error-500">{formatError('emailOrUsername')}</small>
		</label>
		<label class="label">
			<small>Password</small>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<!-- class={setErrorClass(['password', 'unknown'])} -->
				<input
					type={isPasswordVisible ? 'text' : 'password'}
					name="password"
					placeholder="Password"
				/>
				<button
					type="button"
					on:click={() => {
						isPasswordVisible = !isPasswordVisible;
					}}
				>
					<Icon name="eye" width="24px" fill height="24px" />
				</button>
			</div>
			<small class="text-error-500">{formatError('password')}</small>
		</label>
		<button type="submit" class="btn variant-filled">
			<small>SUBMIT</small>
		</button>

		<!-- <label class="label">
			<span>Username</span>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input type="text" placeholder="Enter Username..." />
				<div>
					<Icon name="eye" width="24px" fill height="24px" />
				</div>
			</div>
		</label> -->
	</form>
	<div class="w-full">
		<small>Not registered? <a href={REGISTER_PATH} class="anchor">Create Account</a></small>
	</div>

	<Separator text="OR" />
	<Google />
	<Facebook />
</div>

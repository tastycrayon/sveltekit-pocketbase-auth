<script lang="ts">
	import { initFacebookAuth, initGoogleAuth, pb } from '$lib/pocketbase';
	import { Avatar, focusTrap, modalStore } from '@skeletonlabs/skeleton';
	import Icon from '../icons/icon.svelte';
	import { LOGIN_PATH } from '$lib/constant';
	import GoogleBtn from './buttons/google.svelte';
	import FacebookBtn from './buttons/facebook.svelte';
	import Separator from './separator.svelte';
</script>

<div
	class="modal block bg-surface-100-800-token w-modal h-auto p-4 space-y-4 rounded-container-token shadow-xl"
>
	<header class="modal-header text-2xl font-bold">
		<!-- nav icon -->
		<div class="flex justify-between">
			<button type="button" class="btn-icon bg-transparent" on:click={modalStore.close}>
				<Icon name="left-caret" fill width="24px" height="24px" />
			</button>
			<button type="button" class="btn-icon bg-transparent" on:click={modalStore.close}>
				<Icon name="times" fill width="24px" height="24px" />
			</button>
		</div>
		<!-- header content -->
		<div class="flex flex-col items-center">
			<Avatar initials="LOGO" rounded="rounded-full" />
		</div>
	</header>
	<div class="modal-body flex flex-col items-center">
		<ul class="list py-4 w-80">
			<li><GoogleBtn /></li>
			<li><FacebookBtn /></li>
			<li><Separator text="OR" /></li>
			<li>
				<a
					href={LOGIN_PATH}
					class="btn variant-ringed w-full justify-between"
					on:click={modalStore.close}
				>
					<span class="p-1"><Icon name="envelope-filled" fill width="16px" height="16px" /></span>
					<small>CONTINUE WITH EMAIL</small>
					<span class="w-6" />
				</a>
			</li>
		</ul>
	</div>
	<footer class="modal-footer">
		<div class="w-full text-center">
			<small
				>By signing in, you accept to the <a href="/" class="anchor">Terms and Conditions</a></small
			>
		</div>
	</footer>
</div>

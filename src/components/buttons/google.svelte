<script>
	import { initGoogleAuth } from '$lib/pocketbase';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Icon from '../../icons/icon.svelte';
</script>

<button
	type="button"
	class="btn variant-ringed w-full justify-between"
	on:click={() => {
		initGoogleAuth(modalStore.close);
	}}
>
	<span><Icon name="google" fill width="24px" height="24px" /></span>
	<small>CONTINUE WITH GOOGLE</small>
	<span class="w-6" />
</button>

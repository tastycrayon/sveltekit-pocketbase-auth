<script>
	import { initFacebookAuth } from '$lib/pocketbase';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Icon from '../../icons/icon.svelte';
</script>

<button
	type="button"
	class="btn variant-ringed w-full justify-between"
	on:click={() => {
		initFacebookAuth(modalStore.close);
	}}
>
	<span><Icon name="facebook" fill width="24px" height="24px" /></span>
	<small>CONTINUE WITH FACEBOOK</small>
	<span class="w-6" />
</button>

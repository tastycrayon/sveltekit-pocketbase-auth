<script lang="ts">
	import {
		AppBar,
		modalStore,
		type ModalSettings,
		type ModalComponent,
		LightSwitch
	} from '@skeletonlabs/skeleton';
	import Logout from './logout.svelte';
	import Icon from '../icons/icon.svelte';
	import AuthProviders from './auth-providers.svelte';
	export let user: any;

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: AuthProviders,
		// Add the component properties as key/value pairs
		props: { background: 'bg-red-500' },
		// Provide a template literal for the default component slot
		slot: '<p>Skeleton</p>'
	};
	const handleModal = () => {
		const modal: ModalSettings = {
			type: 'component',
			// Pass the component directly:
			component: modalComponent
		};
		modalStore.trigger(modal);
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="text-xl">LOGO</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<nav>
			<ul class="flex items-center gap-x-6">
				<li><LightSwitch /></li>
				{#if user}
					<li><Logout /></li>
					<li>
						<button type="button" class="btn-icon variant-filled">
							<Icon name="user" fill width="24px" height="24px" /></button
						>
					</li>
				{:else}
					<li>
						<button type="button" class="btn variant-filled m-0" on:click={handleModal}>
							<Icon name="login" fill width="24px" height="24px" />
							<span>SIGN IN</span>
						</button>
					</li>
				{/if}
			</ul>
		</nav>
	</svelte:fragment>
</AppBar>

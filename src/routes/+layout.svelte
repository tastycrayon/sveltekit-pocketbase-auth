<script lang="ts">
	// Your selected Skeleton theme:
	import '../style/theme.postcss';

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	// <!-- css setting end -->
	import { AppShell, Modal } from '@skeletonlabs/skeleton';

	import Navbar from '../components/navbar.svelte';
	import type { LayoutData } from './$types';
	import Footer from '../components/footer.svelte';
	export let data: LayoutData;
	$: user = data.user;
</script>

<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<Navbar {user} />
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div class="container px-10 mx-auto">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>

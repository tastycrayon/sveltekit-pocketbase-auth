<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
</script>

<form
	action="/logout"
	method="POST"
	use:enhance={() =>
		async ({ result }) => {
			await invalidateAll();
			await applyAction(result);
		}}
>
	<button type="submit">Logout</button>
</form>

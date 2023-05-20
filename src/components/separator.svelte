<script lang="ts">
	export let text: string = 'OR';
</script>

<div class={'flex items-center w-full ' + ($$props.class ?? '')}>
	<div class="flex-grow"><hr /></div>
	<span class="m-2">{text}</span>
	<div class="flex-grow"><hr /></div>
</div>

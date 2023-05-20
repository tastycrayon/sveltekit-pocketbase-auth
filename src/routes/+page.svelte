<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { PageData } from './$types';
	export let data: PageData; // received todo from +page.ts
	async function clientSide() {
		console.log(await pb.collection('todos').getList());
	}
</script>

{#if data.user}
	<div class="mx-auto max-w-[400px] p-4">
		<h1 class="h1 font-bold">Hello, I am <span class="text-primary-500">{data.user.name}</span></h1>
	</div>
{/if}
{#if data.todos}
	<nav class="list-nav card p-4 max-w-[400px] mx-auto space-y-4 my-4">
		<h2 class="h2 ml-4">TODOS</h2>
		<ul>
			{#each data.todos.items as todo, i}
				<li>
					<a href="/elements/lists">
						<span class="badge bg-secondary-500">🤟</span>
						<span class="flex-auto">{todo.title}</span>
					</a>
				</li>
			{/each}
		</ul>
		<button class="btn variant-filled my-5" on:click={clientSide}>test</button>
	</nav>
{/if}

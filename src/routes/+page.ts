import { pb } from '$lib/pocketbase';
import type { ITodo } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch: f }) => {
	try {
		const todos = await pb.collection('todos').getList<ITodo>(1, 10);
		return { todos: todos };
	} catch (err) {}
}) satisfies PageLoad;

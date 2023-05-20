import type { ITodo } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
		const todos = await locals.pb.collection('todos').getList<ITodo>(1, 10);
		return { todos: structuredClone(todos) };
	} catch (err) {}
}) satisfies PageServerLoad;

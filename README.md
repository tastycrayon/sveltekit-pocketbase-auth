# Sveltekit Pocketbase authentication

Implementation of with [Sveltekit](https://kit.svelte.dev) and [Pocketbase](https://pocketbase.io) authentication with email and Google OAuth.

![2023-05-20_20-03](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/6bbd58b8-4961-4d7f-a7de-ea9488a3f38e)

|                                                                        Popup                                                                         |                                                                        Signup                                                                        |                                                                       Sign In                                                                        |                                                                            Homepage                                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![Screen Shot 2023-05-20 at 21 05 30](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/ad70f160-ad36-4a3e-b225-eb9c40f63e21) | ![Screen Shot 2023-05-20 at 21 04 14](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/96ac8e07-b70e-4492-85e5-8bf83031ebea) | ![Screen Shot 2023-05-20 at 21 02 24](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/8a1354ba-7da8-497d-9265-77a1203d16d0) | ![Screenshot 2023-05-20 at 20-01-52 Screenshot](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/f27565d6-0564-4974-b02c-32329f147f20) |

## Sveltekit Installation

Install packages and run.

```bash
npm install
npm run dev
```

Update `.env` if you are not using the default pocketbase url. `PUBLIC_POCKETBASE_URL='http://127.0.0.1:8090'`.

## Pocketbase Installation & Setup

```bash
npm install
npm run dev
```

Get `client id` and `client secret` from [Google console](https://console.cloud.google.com/apis/credentials). Create a OAuth project.

**Set uri and Redirect uri.**

```
http://localhost:5173
http://127.0.0.1:8090/api/oauth2-redirect
```

**Copy client id and secret.**

![2023-05-20_21-16](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/39ff8b35-3c2c-4861-b5c6-e17f2e9d09d0)

**_Copy Client ID and Client Secret._**

![2023-05-20_22-11](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/4c4ff923-55d4-4353-873a-ecbef0a35076)

**_Set the providers in pocketbase._**

![2023-05-20_22-20](https://github.com/tastycrayon/sveltekit-pocketbase-auth/assets/37541747/8c619d5c-4dcd-4ae1-9286-bb382e953738)

## Usage

**_Server side_**

```ts
// +page.server.ts

import type { ITodo } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
		const todos = await locals.pb.collection('todos').getList<ITodo>(1, 10);
		// structured clone required cause the data is not serializable by default.
		return { todos: structuredClone(todos) };
	} catch (err) {}
}) satisfies PageServerLoad;
```

**_Client side_**

```ts
// +page.svelte

<script lang="ts">
	import { pb } from '$lib/pocketbase';
    import type { ITodo } from '$lib/types';
	async function clientSideFn() {
		console.log(await pb.collection('todos').getList<ITodo>());
	}
</script>

<button on:click={clientSideFn}>Click Me</button>
```

## How it works

`src/hooks.server.ts` and `src/hooks.client.ts` sits bewteen clients and Sveltekit server. It takes cookie from user, and creates an `pb` instance in Sveltekit.

```ts
const pb = new PocketBase(); // new instance
pb.authStore.loadFromCookie(); // loads cookie from user
event.locals.pb = pb; // now sveltekit server can access it
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

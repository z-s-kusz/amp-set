# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Deploying to Netlify with Svelte 5 preview

1. for svelete 5 prior to official release and other dependencies catching up: use `npm run build --legacy-peer-deps` as the build command -- this might not actually be needed but I'm leaving it for now.

2. set an env variable (only needed on netlify not locally) `NPM_FLAGS` with a value of `--legacy-peer-deps`

TODO: remove the flags when the official release is out and all other packages support svelte 5 and are upgraded.

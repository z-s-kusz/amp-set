<script>
	import Battery from "$lib/battery.svelte";
    import { defaultBatteries } from '$lib/default-batteries';

    const batteries = defaultBatteries;
</script>
<h1 class="text-xl text-slate-100 underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<h1>test header default daisy</h1>

<Battery />
{#each batteries as battery (battery)}
<Battery battery={battery} />
{/each}

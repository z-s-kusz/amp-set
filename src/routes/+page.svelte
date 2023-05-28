<script>
	import Battery from "$lib/battery.svelte";
    import { defaultBatteries } from '$lib/default-batteries';

    const batteries = defaultBatteries;
    const chargeList = ['1s', '2s', '3s', '4s', '5s', '6s'];
</script>
<h1 class="text-xl text-slate-100 underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<h1>test header default daisy</h1>

{#each batteries as battery (battery)}
<Battery battery={battery} />
{/each}

<section class="flex flex-col">
    {#each chargeList as charge (charge)}
    <a href={`/charge/${charge}`}>
        <button class="btn btn-primary">
            &#9889; {charge} Batteries &#9889;
        </button>
    </a>
    {/each}
</section>

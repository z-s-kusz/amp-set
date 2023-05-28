<script>
    import { page } from "$app/stores";
	import Battery from "$lib/battery.svelte";
    const { cells: cellCount } = $page.params;
    console.log($page.params)

    /** @type {import('./$types').PageData} */
    export let data;
    const batteries = data.batteries;
</script>

<h1>showing the page for {cellCount} batteries.</h1>
{#if batteries.length}
    {#each batteries as battery (battery)}
        <Battery battery={battery} />
    {/each}
{:else}
    <h1>You don't have any {cellCount} batteries in your list! Click here to add some.</h1>
{/if}
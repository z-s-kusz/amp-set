<script>
    import { page } from "$app/stores";
	import Battery from "$lib/battery.svelte";
    const { cells: cellCount } = $page.params;

    /** @type {import('./$types').PageData} */
    export let data;
    const batteries = data.batteries; // todo also add the ones user has saved

    let selectedBatteries = batteries.map((battery) => {
        return { ...battery, count: 0 };
    });
    $: totalBatteryCount = selectedBatteries.reduce((acc, current) => {
        return acc + current.count;
    }, 0);
    $: oneAmpCharge = selectedBatteries.reduce((acc, current) => {
        const addedAmps = current.mAh * current.count;
        return acc + addedAmps;
    }, 0);
    $: twoAmpCharge = oneAmpCharge * 2;

    const addBattery = (event) => {
        const battery = selectedBatteries.find(battery => battery.id === event.detail.id);
        battery.count += 1;
        selectedBatteries = selectedBatteries; // is there a bettery way to trigger the set?
    };

    const removeBattery = (event) => {
        const battery = selectedBatteries.find(battery => battery.id === event.detail.id);
        battery.count -= 1;
        selectedBatteries = selectedBatteries; // is there a bettery way to trigger the set?
    };
</script>

<h1 class="hero text-2xl p-8">{cellCount} batteries.</h1>
{#if batteries.length}
    {#each selectedBatteries as battery (battery.id)}
        <Battery battery={battery} on:addBattery={addBattery} on:removeBattery={removeBattery} totalBatteryCount={totalBatteryCount} />
    {/each}
{:else}
    <h1>You don't have any {cellCount} batteries in your list! Click here to add some.</h1>
{/if}

<section class="p-10">
    {#if totalBatteryCount > 0}
        <h1>{totalBatteryCount} Batteries</h1>
        <p>1amp charge: {oneAmpCharge / 1000}</p>
        <p>2amp charge: {twoAmpCharge / 1000}</p>
    {:else}
        <p>Add batteries to get amps to set for charging.</p>
    {/if}
</section>

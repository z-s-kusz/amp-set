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

    const clearAll = (event) => {
        selectedBatteries = selectedBatteries.map((battery) => {
            battery.count = 0;
            return battery;
        });
    };
</script>

<h1 class="hero text-2xl p-8 underline">{cellCount} Batteries</h1>

{#if cellCount === '1S'}
    <p class="p-10">
        (For Zach)
        <em>
            Why are you looking for parallel charge info, you have a SERIES charger.
            DO NOT charge unlike batteries and ONLY charge them at a single batteries 2C level!
        </em>
    </p>
{/if}

<section>
    {#if batteries.length}
        {#each selectedBatteries as battery (battery.id)}
            <Battery battery={battery} on:addBattery={addBattery} on:removeBattery={removeBattery} totalBatteryCount={totalBatteryCount} />
        {/each}
    {:else}
        <h1>You don't have any {cellCount} batteries in your list!</h1>
    {/if}
</section>

<section class="p-10 mx-auto max-w-lg">
    {#if totalBatteryCount > 0}
        <button type="button" class="btn btn-secondary btn-sm mb-2" on:click={clearAll}>
            Clear All Selections
        </button>
        <h1>{totalBatteryCount} Batteries</h1>
        <p>1C charge: {oneAmpCharge / 1000}amps</p>
        <p>2C charge: {twoAmpCharge / 1000}amps</p>
    {:else}
        <p>Add batteries to get amps to set for charging.</p>
    {/if}
</section>

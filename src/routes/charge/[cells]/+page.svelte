<script>
    import { page } from "$app/stores";
	import Battery from "$lib/battery.svelte";
    const { cells: cellCount } = $page.params;

    /** @type {import('./$types').PageData} */
    let { data } = $props();
    const batteries = data.batteries;
    const defaultSelectedBatteries = batteries.map((battery) => {
        return { ...battery, count: 0 };
    });
    let selectedBatteries = $state(defaultSelectedBatteries)

    let totalBatteryCount = $derived(
        selectedBatteries.reduce((acc, current) => {
            return acc + current.count;
        }, 0)
    );
    let oneAmpCharge = $derived(
        selectedBatteries.reduce((acc, current) => {
            const addedAmps = current.mAh * current.count;
            return acc + addedAmps;
        }, 0)
    );
    let twoAmpCharge = $derived(oneAmpCharge * 2);
    let highVoltageMixWarning = $derived.by(() => {
        let includesHV = false;
        let includesStandard = false;
        selectedBatteries.forEach((battery) => {
            if (battery.count > 0) {
                if (battery.hv) includesHV = true;
                else includesStandard = true;
            }
        });
        return includesHV && includesStandard;
    });

    const addBattery = (event) => {
        const battery = selectedBatteries.find(battery => battery.id === event.detail.id);
        battery.count += 1;
    };

    const removeBattery = (event) => {
        const battery = selectedBatteries.find(battery => battery.id === event.detail.id);
        battery.count -= 1;
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
            Why are you looking for parallel charge info, you have a SERIES charger for 1S batteries.
            For 1S DO NOT charge unlike batteries and ONLY charge them at a single batteries 2C level!
        </em>
    </p>
{/if}

<section class="p-10 mx-auto max-w-lg">
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
        <button type="button" class="btn btn-secondary btn-sm mb-2" onclick={clearAll}>
            Clear All Selections
        </button>
        <h1>{totalBatteryCount} Batteries</h1>
        <p>1C charge: {oneAmpCharge / 1000}amps</p>
        <p>2C charge: {twoAmpCharge / 1000}amps</p>
        {#if highVoltageMixWarning}
            <p class="text-warning">HV + lipo -  ONLY charge to standard lipo max</p>
        {/if}
    {:else}
        <p>Add batteries to get amps to set for charging.</p>
    {/if}
</section>

<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let battery = {
        id: '-1',
        cellCount: 1,
        manufacturer: 'RDQ',
        mAh: 0,
        cRating: 70,
        totalVoltage: 7.4,
        WH: 0,
        hv: false,
        connector: 'PH2.0',
        count: 0,
    };
    const { cellCount, cRating, totalVoltage, WH, manufacturer, mAh, connector, hv } = battery;

    export let totalBatteryCount = 0;
    $: disableAdd = totalBatteryCount >= 6;
    $: disableRemove = battery.count <= 0;
    $: chargeDisplayClass = battery.count > 0 ? 'text-primary' : ''

    const addBattery = (selectedBattery) => {
        if (!disableAdd) {
            dispatch('addBattery', selectedBattery);
        }
    };
    const removeBattery = (selectedBattery) => {
        if (!disableRemove > 0) {
            dispatch('removeBattery', selectedBattery);
        }
    };
</script>

<div class="border-2 border-blue-400 rounded-md max-w-md m-2 p-8 flex flex-row justify-between">
    <div>
        <h1 class={`card-title ${chargeDisplayClass}`}>
            {mAh}mAh
            {#if hv}HV{/if}
            - {manufacturer}
        </h1>
        <span>{cellCount}S</span>
        <span>{cRating}C</span>
        <span>{totalVoltage}V</span>
        <span>{WH}WH</span>
        <br />
        <p>{connector} connector</p>
        <p class={chargeDisplayClass}>Charging: {battery.count}</p>
    </div>
    <div class="flex flex-col justify-center">
        <button type="button" class="btn btn-primary btn-sm m-2" on:click={addBattery(battery)} disabled={disableAdd}>Add</button>
        <button type="button" class="btn btn-primary btn-sm m-2" on:click={removeBattery(battery)} disabled={disableRemove}>Remove</button>
    </div>
</div>

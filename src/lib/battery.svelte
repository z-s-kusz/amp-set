<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    const defaultBatery = {
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
    let {
        battery = defaultBatery,
        totalBatteryCount = 0
    } = $props();
    const { cellCount, cRating, totalVoltage, WH, manufacturer, mAh, connector, hv } = battery;
    const title = hv ? `${mAh}mAh HV - ${manufacturer}` : `${mAh}mAh - ${manufacturer}`;

    let disableAdd = $derived(totalBatteryCount >= 6);
    let disableRemove = $derived(battery.count <= 0);
    let chargeDisplayClass = $derived(battery.count > 0 ? 'text-primary' : '');

    const addBattery = () => {
        if (!disableAdd) dispatch('addBattery', battery);
    };
    const removeBattery = () => {
        if (!disableRemove > 0) dispatch('removeBattery', battery);
    };
</script>

<div class="border-2 border-blue-400 rounded-md max-w-lg m-2 p-8 flex flex-row justify-between mx-auto">
    <div>
        <h1 class={`card-title ${chargeDisplayClass}`}>{title}</h1>
        <span>{totalVoltage}V</span>
        <span>{cellCount}S</span>
        <span>{cRating}C</span>
        <span>{WH}WH</span>
        <br />
        <p>{connector} connector</p>
        <p class={chargeDisplayClass}>Charging: {battery.count}</p>
    </div>
    <div class="flex flex-col justify-center">
        <button type="button" class="btn btn-primary btn-sm m-2" onclick={addBattery} disabled={disableAdd}>
            Add
        </button>
        <button type="button" class="btn btn-primary btn-sm m-2" onclick={removeBattery} disabled={disableRemove}>
            Remove
        </button>
    </div>
</div>

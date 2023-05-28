<script>
    export let battery = {
        cellCount: 1,
        manufacturer: 'RDQ',
        mAh: 0,
        cRating: 70,
        totalVoltage: 7.4,
        WH: 0,
        hv: false,
        connector: 'PH2.0',
    };
    const { cellCount, cRating, totalVoltage, WH, manufacturer, mAh, connector, hv } = battery;
</script>

<div class="border-2 border-blue-400 rounded-md max-w-md m-2 p-8">
    <h1 class="card-title">
        {mAh}mAh
        {#if hv}HV{/if}
        - {manufacturer}
    </h1>
    <span>{cellCount}S</span>
    <span>{cRating}C</span>
    <span>{totalVoltage}V</span>
    <span>{WH}WH</span>
    <br />
    <span>{connector} connector</span>
</div>

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
</script>

<div>
    <h1>{battery.manufacturer} {battery.mAh} mAh</h1>
</div>

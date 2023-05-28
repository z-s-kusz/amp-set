<script>
    const chargeList = ['1S', '2S', '3S', '4S', '5S', '6S'];
</script>

<header class="card text-center">
    <h1 class="text-2xl">Select a cell count to get charging!</h1>
    <p class="text-sm">* Not Liable for any damage caused by charging</p>
</header>
<section class="flex flex-col items-center">
    {#each chargeList as charge (charge)}
    <a href={`/charge/${charge}`}>
        <button class="btn btn-primary m-2">
            &#9889; {charge} Batteries &#9889;
        </button>
    </a>
    {/each}
</section>

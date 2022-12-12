<template>
    <h2> Prøver </h2>
    <div class="prøver">
        <Prøve v-for="prøve in prøver" :lærer="prøve.lærer" :length="prøve.length" :date="prøve.date" :completed="prøve.completed"></Prøve>
    </div>
</template>

<script>
import Prøve from './Prøve.vue';

export default {
    name: "PrøveOverview",
    components: {Prøve},
    data: () => {
        return {
            prøver: [{lærer:"Test", length:10, date:"17/12-2022", completed: false},{lærer:"Test", length:20, date:"19/12-2022", completed: true}],
        }
    },
}
</script>

<style scoped>
.prøver {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
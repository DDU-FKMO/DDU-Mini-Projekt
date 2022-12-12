<template>
    <div class="opgave">
        <span>{{lærer}}</span>
        <span>{{length}}</span>
        <span>{{date}}</span>
        <span>{{completed}}</span>
    </div>
</template>

<script>
export default {
    name: "Opgave",
    props: {lærer: "", length: 0, date: "", completed: false},
    methods: {
        
    },
    mounted() {
        
    }
}
</script>

<style scoped>
    .opgave {
        width: 20rem;
        height: 10rem;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        border: 2px solid black;
        padding: 2px;
        margin: 2rem;
    }
    .opgave span {
        font-size: 1.25rem;
    }
</style>
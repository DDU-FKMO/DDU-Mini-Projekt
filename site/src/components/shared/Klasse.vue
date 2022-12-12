<template>
    <div class="klasse">
        <span>Navn: {{ klasseNavn }}</span>
        <span>InviteCode: {{ inviteCode }}</span>
    </div>
</template>

<script>
export default {
    name: "KlasseListe",
    props: { klasseNavn: "", inviteCode: "" },
    methods: {

    },
    mounted() {

    }
}
</script>

<style scoped>
.klasse {
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

.klasse span {
    font-size: 1.25rem;
}
</style>
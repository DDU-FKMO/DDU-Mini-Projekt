<template>
    <a v-if="!focus" class="opgave" @click="click()">
        <span>{{ klasse }}</span>
        <span>{{ length }}</span>
        <span>{{ date }}</span>
        <span>{{ completed }}</span>
    </a>
    <div v-if="focus" class="focus">
        <span>{{ klasse }}</span>
        <span>{{ length }}</span>
        <span>{{ date }}</span>
        <span>{{ completed }}</span>
    </div>
</template>

<script>
export default {
    name: 'Opgave',
    props: {klasse: '', length: 0, date: '', completed: false, id: 0, focus: false},
    data: () => {
        return {
            jsonData: null,
        };
    },
    methods: {
        click() {
            console.log('clicked ' + this.id);
            this.$parent.setFocus(this.id);
        },
    },
};
</script>

<style scoped>
.opgave {
    width: 20rem;
    height: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border: 3px solid var(--color-border);
    padding: 3px;
    margin: 2rem;
    text-decoration: none;
    color: var(--color-text);
}
.opgave:hover {
    border: 2px solid var(--color-border-hover);
    cursor: pointer;
}
.opgave span {
    font-size: 1.25rem;
}
</style>

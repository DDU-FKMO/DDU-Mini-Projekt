<template>
    <a v-if="!focus" class="opgave" @click="click()">
        <span>{{ klasse }}</span>
        <span>{{ length }}</span>
        <span>{{ date }}</span>
        <span>{{ completed }}</span>
    </a>
    <div v-if="focus && userInfo.teacher" class="focus">
        <h3>Lærer oversigt</h3>
        <span>{{ klasse }}</span>
        <span>{{ length }}</span>
        <span>{{ date }}</span>
        <span>{{ completed }}</span>
        <div class="questions">
            <p v-for="opgave in jsonData.questions">{{ opgave }}</p>
        </div>
    </div>
    <div v-if="focus && !userInfo.teacher" class="focus">
        <h3>Elev oversigt</h3>
        <span>{{ klasse }}</span>
        <span>{{ length }} spørgsmål</span>
        <span>{{ date }}</span>
        <input v-if="completed" class="completeBox" type="checkbox" checked disabled />
        <input v-if="!completed" class="completeBox" type="checkbox" unchecked disabled />
        <button v-if="available">Start</button>
        <button v-if="!available" disabled>Start</button>
    </div>
</template>

<script>
import {getUserInfo} from '../../main';

export default {
    name: 'Opgave',
    props: {klasse: '', length: 0, date: '', completed: false, id: 0, focus: false},
    data: () => {
        return {
            jsonData: {},
            userInfo: {},
            available: false,
        };
    },
    methods: {
        click() {
            console.log('clicked ' + this.id);
            this.$parent.setFocus(this.id);
        },
    },
    mounted() {
        this.jsonData = this.$parent.getOpgave(this.id);
        this.userInfo = getUserInfo();
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
.focus {
    margin: auto;
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

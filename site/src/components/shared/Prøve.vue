<template>
    <a v-if="!focus" class="opgave" @click="click()">
        <span>{{ klasse }}</span>
        <span>{{ length }}</span>
        <span>{{ dateString }}</span>
    </a>
    <div v-if="focus && userInfo.teacher" class="focus">
        <h3>Lærer oversigt</h3>
        <span>{{ klasse }}</span>
        <span>{{ length }}</span>
        <span>{{ dateString }}</span>
        <div class="questions">
            <p v-for="opgave in jsonData.questions">{{ opgave }}</p>
        </div>
    </div>
    <div v-if="focus && !userInfo.teacher" class="focus">
        <h3>Elev oversigt</h3>
        <span>{{ klasse }}</span>
        <span>{{ length }} spørgsmål</span>
        <span>{{ dateString }}</span>
        <div style="flex-direction: row;">
            <p>Fuldført: </p>
            <input v-if="completed" class="completeBox" type="checkbox" checked disabled />
            <input v-if="!completed" class="completeBox" type="checkbox" unchecked disabled />
        </div>
        <button v-if="available" @click="start">Start</button>
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
            dateString: "",
        };
    },
    methods: {
        click() {
            console.log('clicked ' + this.id);
            this.$parent.setFocus(this.id);
        },
        start() {
            console.log('start ' + this.id);
            this.$parent.startPrøve(this.id);
        }
    },
    mounted() {
        this.jsonData = this.$parent.getOpgave(this.id);
        this.userInfo = getUserInfo();
        this.dateString = new Date(this.date).toLocaleString();
        if (Date.now() > this.date && !this.completed) {
            this.available = true;
        } else {
            this.available = false;
        }
        setInterval(() => {
            if (Date.now() > this.date && !this.completed) {
                this.available = true;
            } else {
                this.available = false;
            }
        }, 1000);
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

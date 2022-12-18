<template>
    <a v-if="!focus" class="opgave" :class="completed ? 'completed' : ''" @click="click()">
        <h3>{{ testName }}</h3>
        <span>Klasse: {{ klasse }}</span>
        <span>Længde: {{ length }} spørgsmål</span>
        <span :class="completed ? 'completedText' : ''">{{ dateString }}</span>
    </a>
    <div v-if="focus && userInfo.teacher == 1" class="focus">
        <h2>Lærer oversigt - {{ testName }}</h2>
        <span>Klasse: {{ klasse }}</span>
        <span>Prøven består af {{ length }} spørgsmål</span>
        <span>Starter {{ dateString }}</span>
        <button v-if="available" @click="start" enabled>Se resultater</button>
        <div class="questions">
            <h3>Spørgsmål</h3>
            <div v-for="question in prøveData.questions.questions" class="question">
                <h3>{{ question.questionName }}</h3>
                <h4>{{ question.inputText }}</h4>
                <img v-if="question.inputImage" :src="question.inputImage" alt="opgave billede" />
                <div v-if="question.isMult">
                    <h5>Svarmuligheder</h5>
                    <div class="answer" v-for="answer in question.responseOptions">
                        <p>{{ answer }}</p>
                        <input type="checkbox" onclick="return false;" :checked="question.responseOptions.indexOf(answer) == question.correctAnswer ? true : false" />
                    </div>
                </div>
                <div v-else>
                    <input type="text" value="tekst svar..." disabled />
                </div>
            </div>
        </div>
    </div>
    <div v-if="focus && userInfo.teacher != 1" class="focus">
        <h2>Elev oversigt - {{ testName }}</h2>
        <span>Klasse: {{ klasse }}</span>
        <span>Prøven består af {{ length }} spørgsmål</span>
        <span>Starter {{ dateString }}</span>
        <p v-if="completed">Allerede besvaret</p>
        <p v-if="!completed">Ikke besvaret</p>
        <button v-if="available" @click="start" enabled>Start prøve</button>
        <button v-if="!available" disabled>Start prøve</button>
    </div>
</template>

<script>
import {getUserInfo} from '../../main';

export default {
    name: 'Opgave',
    props: {testName: '1', klasse: '', length: 0, date: '', completed: false, id: 0, focus: false},
    data: () => {
        return {
            prøveData: {},
            userInfo: {},
            available: false,
            dateString: '',
        };
    },
    methods: {
        click() {
            this.$parent.setFocus(this.id);
        },
        start() {
            this.$parent.startPrøve(this.id);
        },
    },
    mounted() {
        this.prøveData = this.$parent.getOpgave(this.id);
        this.userInfo = getUserInfo();
        console.log(this.userInfo);
        this.dateString = new Date(this.date).toLocaleString();
        if (Date.now() > this.date && !this.completed) {
            this.available = true;
        } else {
            this.available = false;
        }
        console.log(this.available);
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
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 3px solid var(--color-border);
    padding: 3px;
    margin: 2rem;
    text-decoration: none;
    color: var(--color-text);
}
.opgave h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
}
.opgave:hover {
    border: 3px solid var(--color-border-hover);
    cursor: pointer;
}
.opgave span {
    font-size: 1.25rem;
}
.completed {
    border: 3px solid rgba(8, 96, 0, 0.604);
}
.completedText {
    color: rgba(12, 136, 0, 0.85);
    text-decoration: line-through;
}

.focus {
    margin: auto;
    width: 80%;
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-decoration: none;
    color: var(--color-text);
    font-size: 1.4rem;
}
h2 {
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
    margin-bottom: 5rem;
}
button {
    width: 10rem;
    height: 3rem;
    font-size: 1.5rem;
    font-weight: 600;
    border: 3px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
    transition: font-size 0.2s, border 0.2s;
}
button[disabled] {
    border: 3px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
    text-decoration: line-through;
}
button[enabled]:hover {
    font-size: 1.6rem;
    border: 3px solid var(--color-border-hover);
}

.questions {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 35rem;
    height: 100%;
    margin: 2rem;
    border: 3px solid var(--color-border);
}
.questions div {
    margin: 1rem 0 1rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.questions .answer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.questions .answer input {
    margin-left: 0.5rem;
    accent-color: green;
}
.questions h5 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}
.questions h3 {
    font-size: 2.5rem;
    font-weight: 600;
    margin: 0;
}
</style>

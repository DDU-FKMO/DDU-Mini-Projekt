<template>
    <h2>{{ prøveData.questions.testName }}</h2>
    <form class="questions" name="prøve" action="/opgave-post" method="POST">
        <input type="hidden" name="prøveId" :value="prøveData.id" />
        <input type="hidden" name="session" :value="sessionId" />
        <div v-for="question in prøveData.questions.questions" class="question">
            <h3>{{ question.questionName }}</h3>
            <h4>{{ question.inputText }}</h4>
            <img v-if="question.inputImage" :src="question.inputImage" alt="opgave billede" />
            <div v-if="question.isMult">
                <h5>Svarmuligheder</h5>
                <div class="answer" v-for="answer in question.responseOptions">
                    <label :for="'answer-' + answer">{{ answer }}</label>
                    <input type="radio" :name="'answer-' + question.questionName" :id="'answer-' + answer" :value="question.responseOptions.indexOf(answer)" />
                </div>
            </div>
            <div v-else>
                <input type="text" :name="'answer-' + question.questionName" />
            </div>
        </div>
        <input type="submit" value="Aflever svar" />
    </form>
</template>

<script>
import {getUserInfo} from '../../main';

export default {
    name: 'PrøveVisning',
    data: () => {
        return {
            userInfo: {},
            title: '',
            sessionId: window.localStorage.getItem('session'),
            currentQuestion: 0,
        };
    },
    props: {id: null, prøveData: {}},
    mounted() {
        this.userInfo = getUserInfo();
        /*this.prøveData = this.$parent.getOpgave(this.id);
        title = this.prøveData.questions.testName;*/
        console.log(this.prøveData);
    },
};
</script>

<style>
h2 {
    text-align: center;
    font-size: 5rem;
    font-weight: 600;
    margin-bottom: 5rem;
}

button,
[type='submit'],
[type='button'] {
    width: 12rem;
    height: 3rem;
    font-size: 1.5rem;
    font-weight: 600;
    border: 3px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
    transition: font-size 0.2s, border 0.2s;
    margin: 1rem;
}
button[disabled],
[type='submit'][disabled],
[type='button'][disabled] {
    border: 3px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
    text-decoration: line-through;
}
button:hover,
[type='submit']:hover,
[type='button']:hover {
    font-size: 1.6rem;
    border: 3px solid var(--color-border-hover);
}

.questions {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 30rem;
    margin: 2rem;
    border: 3px solid var(--color-border);
    padding-bottom: 1rem;
}
.questions .question {
    margin: 1rem 0 1rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 3rem;
    border-bottom: 3px solid var(--color-border);
}
.question img {
    max-width: 75%;
    height: auto;
}
.question .answer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.answer input {
    margin-left: 1rem;
    accent-color: green;
}
.answer input:hover,
.answer input:focus {
    cursor: normal;
    accent-color: green;
}
.question h5 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}
.question h3 {
    font-size: 2.5rem;
    font-weight: 600;
    margin: 0;
}
</style>

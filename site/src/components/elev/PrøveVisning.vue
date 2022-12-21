<template>
    <div class="content" id="green">
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
                <input type="textarea" :name="'answer-' + question.questionName" />
            </div>
        </div>
        <input type="submit" value="Aflever svar" />
    </form>
    </div>
</template>

<script>
import {getUserInfo} from '../../main';

export default {
    name: 'PrøveVisning',
    data: () => {
        return {
            userInfo: {},
            sessionId: window.localStorage.getItem('session'),
        };
    },
    props: {prøveData: {}},
    mounted() {
        this.userInfo = getUserInfo();
        /*this.prøveData = this.$parent.getOpgave(this.id);
        title = this.prøveData.questions.testName;*/
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

[type='radio'] {
    margin-left: 0.5rem;
    accent-color: green;
}

.questions {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 30rem;
    margin: 2rem;
    border: 3px solid var(--color-border-hover);
    padding-bottom: 1rem;
    border-radius: 3rem;
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

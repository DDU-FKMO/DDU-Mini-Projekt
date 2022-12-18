<template>
    <h2>Resultater - {{ prøveData.questions.testName }}</h2>
    <div class="questions">
        <h3>Spørgsmål</h3>
        <div v-for="question in prøveData.questions.questions" class="question">
            <h3>{{ question.questionName }}</h3>
            <h4>{{ question.inputText }}</h4>
            <img v-if="question.inputImage" :src="question.inputImage" alt="opgave billede" />
            <div v-if="question.isMult" class="correct">
                <h5>Korrekt svar</h5>
                <div class="answer" v-for="answer in question.responseOptions">
                    <p>{{ answer }}</p>
                    <input type="checkbox" onclick="return false;" :checked="question.responseOptions.indexOf(answer) == question.correctAnswer ? true : false" :style="'accent-color: green;'" />
                </div>
            </div>
            <div v-for="resultat in resultatData" class="resultatTab">
                <h5>{{ resultat.username }}</h5>
                <div v-if="question.isMult && resultat.result != null">
                    <div class="answer" v-for="answer in question.responseOptions">
                        <p>{{ answer }}</p>
                        <input
                            type="checkbox"
                            onclick="return false;"
                            :checked="resultat.result[prøveData.questions.questions.indexOf(question)] == question.responseOptions.indexOf(answer)"
                            :style="'accent-color: ' + (question.responseOptions.indexOf(answer) == question.correctAnswer ? 'green' : 'red') + ';'"
                        />
                    </div>
                </div>
                <div v-else-if="resultat.result != null">
                    <input type="text" value="tekst svar..." disabled />
                </div>
                <div v-else>
                    <p>Ikke besvaret</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getUserInfo, IO} from '../../main';

export default {
    name: 'ResultatVisning',
    data: () => {
        return {
            userInfo: {},
            resultatData: [
                {userId: 2, username: 'Test user 2', date: '1671218421808.0', result: ['3', 'Besvarelse i tekst...']},
                {userId: 1, username: 'Test user 1', date: null, result: null},
            ],
        };
    },
    props: {prøveData: {}},
    mounted() {
        console.log('Resultatvisning');
        this.userInfo = getUserInfo();
        console.log(this.userInfo);
        console.log(this.prøveData);
        console.log(this.resultatData);
        IO.socket.emit('getResults', {testId: this.prøveData.id, userId: this.userInfo.id, classId: this.prøveData.classId, sessionId: window.localStorage.getItem('session')});
        IO.socket.on('resultInfo', (data) => {
            this.resultatData = data;
        });
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

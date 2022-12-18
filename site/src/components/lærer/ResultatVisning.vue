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
                    <input type="checkbox" :checked="question.responseOptions.indexOf(answer) == question.correctOption ? true : false" :style="'color: green;'" disabled />
                </div>
            </div>
            <div class="resultater">
                <div v-for="resultat in resultatData" class="resultat">
                    <h5>{{ resultat.username }}</h5>
                    <div v-if="question.isMult && resultat.result != null">
                        <div class="answer" v-for="answer in question.responseOptions">
                            <p>{{ answer }}</p>
                            <input
                                type="checkbox"
                                :checked="resultat.result[prøveData.questions.questions.indexOf(question)] == question.responseOptions.indexOf(answer)"
                                :style="'color: ' + (question.responseOptions.indexOf(answer) == question.correctOption ? 'green' : 'red') + ';'"
                                disabled
                            />
                        </div>
                    </div>
                    <div v-else-if="resultat.result != null">
                        <p class="textSvar">{{ resultat.result[prøveData.questions.questions.indexOf(question)] }}</p>
                    </div>
                    <div v-else>
                        <p>Ikke besvaret</p>
                    </div>
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
            resultatData: [],
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

h3 {
    text-align: center;
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 3rem;
}

.questions {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 75vw;
    margin: 2rem;
    border: 3px solid var(--color-border-hover);
    padding-bottom: 1rem;
}
.questions .question {
    padding-top: 3rem;
    border-bottom: 0;
    border-top: 3px solid var(--color-border);
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

.correct {
    border-top: 3px solid var(--color-border-soft);
    padding-top: 1rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.resultater {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 90%;
    max-width: 80vw;
    overflow-x: scroll;
    border-top: 3px solid var(--color-border-soft);
    padding-top: 1rem;
    margin: 0.5rem;
}
.resultater .resultat {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    min-width: 12rem;
    min-height: 10rem;
    border: 3px solid var(--color-border-soft);
    margin: 0.25rem;
    padding: 0.5rem;
}
.resultat div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
}
.resultat .textSvar {
    width: 100%;
    min-height: 5rem;
    word-wrap: normal;
    word-break: normal;
}
</style>

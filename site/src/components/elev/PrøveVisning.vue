<template>
    <h2>{{prøveData.testName}}</h2>
    <div id="opgaver">
        <form name="prøve" action="/opgave-post" method="POST">
            <input type="hidden" name="prøveId" :value="prøveData.id"/>
            <input type="hidden" name="session" :value="sessionId"/>
            <div v-for="question in prøveData.questions.questions" class="question">
                <h3>{{question.questionName}}</h3>
                <h4>{{question.inputText}}</h4>
                <div v-if="question.isMult">
                    <h5>Svarmuligheder</h5>
                    <div v-for="answer in question.responseOptions" >
                        <label :for="'answer-' + answer">{{answer}}</label>
                        <input type="radio" :name="'answer-' + question.questionName" :id="'answer-' + answer" :value="question.responseOptions.indexOf(answer)"/>
                    </div>
                </div>
                <div v-else>
                    <input type="text" :name="'answer-' + question.questionName">
                </div>
            </div>
            <input type="submit" value="Aflever svar" />
        </form>
    </div>
</template>

<script>
import {getUserInfo} from '../../main';

export default {
    name:"PrøveVisning",
    data: () => {
        return {
            userInfo: {},
            sessionId: window.localStorage.getItem('session'),
            prøveData: {},
            currentQuestion: 0,
        };
    },
    props: {id: null},
    mounted() {
        this.userInfo = getUserInfo();
        this.prøveData = this.$parent.getOpgave(this.id);
        console.log(this.prøveData);
    }
}
</script>
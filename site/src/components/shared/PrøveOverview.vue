<template>
    <div class="content" id="green">
        <div v-if="overview" id="overview">
            <h2 v-if="!focus">Prøver</h2>
            <button v-if="userInfo.teacher == 1 && !focus" @click="opretOpgave">Opret prøve</button>
            <div id="prøver" v-if="!focus">
                <Prøve v-for="prøve in prøveData" :testName="prøve.questions.testName" :klasse="prøve.className" :length="prøve.questions.questions.length" :date="prøve.date" :completed="prøve.completed" :id="prøve.id" :focus="false"></Prøve>
            </div>
            <div v-if="focus" id="focus">
                <Prøve :testName="focus.questions.testName" :klasse="focus.className" :length="focus.questions.questions.length" :date="focus.date" :completed="focus.completed" :id="focus.id" :focus="true"></Prøve>
            </div>
        </div>
        <PrøveVisning v-if="!overview && userInfo.teacher != 1" :prøveData="focus"></PrøveVisning>
        <ResultatVisning v-if="!overview && userInfo.teacher == 1" :prøveData="focus"></ResultatVisning>
    </div>
</template>

<script>
import Prøve from './Prøve.vue';
import PrøveVisning from '../elev/PrøveVisning.vue';
import ResultatVisning from '../lærer/ResultatVisning.vue';
import {IO, getUserInfo} from '../../main';
import App from '../../App.vue';

export default {
    name: 'PrøveOverview',
    components: {Prøve, PrøveVisning, ResultatVisning},
    data: () => {
        return {
            overview: true,
            prøveData: [
                {
                    id: 1,
                    className: 'test',
                    classId: 1,
                    date: 1671019200000,
                    completed: false,
                    questions: {
                        testName: 'test name',
                        questions: [
                            {
                                questionName: 'test question 1',
                                inputText: 'description text...',
                                inputImage: '/images/test.png',
                                isMult: true,
                                responseOptions: ['test answer 1', 'test answer 2', 'test answer 3', 'test answer 4'],
                                correctOption: 1,
                            },
                            {
                                questionName: 'test question 2',
                                inputText: 'description text 2...',
                                inputImage: '/images/test.png',
                                isMult: false,
                                responseOptions: [],
                                correctOption: null,
                            },
                        ],
                    },
                },
            ],
            focus: null,
            userInfo: {},
        };
    },
    methods: {
        setFocus(id) {
            this.focus = this.getOpgave(id);
            ///console.log(this.focus);
        },
        getOpgave(id) {
            return this.prøveData.find((prøve) => {
                return prøve.id === id;
            });
        },
        startPrøve(id) {
            this.overview = false;
            this.focus = this.getOpgave(id);
        },
        opretOpgave() {
            App.methods.changePage('/opret_opgave');
        },
    },
    mounted() {
        //Get prøver from database
        ///console.log(this.prøveData);
        let user = getUserInfo();
        this.userInfo = user;
        IO.socket.emit('getPrøver', {user: user.id, session: window.localStorage.getItem('session')});
        IO.socket.on('prøveInfo', (data) => {
            this.prøveData = data;
            ///console.log(this.prøveData);
            this.prøveData.forEach((prøve) => {
                prøve.questions = JSON.parse(prøve.questions);
            });
        });
        //Error
        ///console.log('Hash: ' + window.location.hash);
        if (window.location.hash == '#error') {
            alert('Der skete en fejl, ved aflevering af prøven.');
            window.location.hash = '';
        }
    },
};
</script>

<style scoped>
h2 {
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
    margin-bottom: 5rem;
}

#overview {
    width: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
#prøver {
    width: 100%;
    min-height: 50vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

#focus {
    width: 100%;
    min-height: 75vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

<template>
    <div v-if="overview" id="overview">
        <h2 v-if="!focus">Prøver</h2>
        <button v-if="userInfo.teacher == 1" @click="opretOpgave">Opret prøve</button>
        <div id="prøver" v-if="!focus">
            <Prøve v-for="prøve in prøver" :klasse="prøve.klasse" :length="prøve.length" :date="prøve.date" :completed="prøve.completed" :id="prøve.id" :focus="false"></Prøve>
        </div>
        <h2 v-if="focus">Prøve</h2>
        <div v-if="focus" id="focus">
            <Prøve :klasse="focus.klasse" :length="focus.length" :date="focus.date" :completed="focus.completed" :id="focus.id" :focus="true"></Prøve>
        </div>
    </div>
    <PrøveVisning v-if="!overview" :id="focus.id"></PrøveVisning>
</template>

<script>
import Prøve from './Prøve.vue';
import PrøveVisning from '../elev/PrøveVisning.vue';
import {IO, getUserInfo} from '../../main';
import App from "../../App.vue";

export default {
    name: 'PrøveOverview',
    components: {Prøve, PrøveVisning},
    data: () => {
        return {
            overview: true,
            prøveData: {},
            prøver: [],
            focus: null,
            userInfo: {},
        };
    },
    methods: {
        setFocus(id) {
            this.focus = this.getOpgave(id);
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
            App.methods.changePage("/opret_opgave");
        }
    },
    mounted() {
        //Get prøver from database
        let user = getUserInfo();
        this.userInfo = user;
        IO.socket.emit('getPrøver', {user: user.id, session: window.localStorage.getItem('session')});
        IO.socket.on('prøveInfo', (data) => {
            this.prøveData = data;
            this.prøveData.forEach((prøve) => {
                prøve.questions = JSON.parse(prøve.questions);
                this.prøver.push({
                    klasse: prøve.className,
                    length: prøve.questions.questions.length,
                    date: prøve.date,
                    completed: prøve.completed,
                    id: prøve.id,
                });
            });
        });
        //Error
        if(window.location.hash == "#error") {
            alert("Der skete en fejl, ved aflevering af prøven.");
            window.location.hash = "";
        }
    },
};
</script>

<style scoped>
#overview {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
#prøver {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
#focus {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>

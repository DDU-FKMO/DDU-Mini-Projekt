<template>
    <h1>Klasser:</h1>
    <button v-if="userInfo.teacher == 1" @click="opretKlasse">Opret klasse</button>
    <button v-if="userInfo.teacher == 0" @click="joinKlasse">Tilslut klasse</button>
    <div class="klasser">
        <Klasse v-for="klasse in klasser" :klasseNavn="klasse.className" :inviteCode="klasse.inviteCode"></Klasse>
    </div>
</template>

<script>
import {getUserInfo} from '../../main';
import App from '../../App.vue';
import Klasse from './Klasse.vue';

export default {
    name: 'KlasseOverview',
    components: {Klasse},
    data: () => {
        return {
            klasser: [
                {className: '3a2', inviteCode: '123'},
                {className: '3c', inviteCode: 'test'},
                {className: '3h', inviteCode: '3924ef'},
            ],
            userInfo: {},
        };
    },
    methods: {
        opretKlasse() {
            App.methods.changePage('/opret_klasse');
        },
        joinKlasse() {
            App.methods.changePage('/join_klasse');
        },
    },
    mounted() {
        this.userInfo = getUserInfo();
    },
};
</script>

<style scoped>
.klasser {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
</style>

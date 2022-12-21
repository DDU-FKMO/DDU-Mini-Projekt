<template>
    <h1>Klasser</h1>
    <button v-if="userInfo.teacher == 1" @click="opretKlasse">Opret klasse</button>
    <button v-if="userInfo.teacher == 0" @click="joinKlasse">Tilslut klasse</button>
    <div class="klasser">
        <Klasse v-for="klasse in klasser" :klasseNavn="klasse.className" :inviteCode="klasse.inviteCode"></Klasse>
    </div>
</template>

<script>
import {getUserInfo,IO} from '../../main';
import App from '../../App.vue';
import Klasse from './Klasse.vue';

export default {
    name: 'KlasseOverview',
    components: {Klasse},
    data: () => {
        return {
            klasser: [
                
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
        //get klasser
        
        let user = getUserInfo();
        this.userInfo = user;
        IO.socket.emit('getKlasser', { user: user.id, session: window.localStorage.getItem('session') });
        IO.socket.on('klasseInfo', (data) => {
            this.klasser = data;
            console.log(this.klasser);
        });
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


h1 {
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
    margin-bottom: 5rem;
}
</style>

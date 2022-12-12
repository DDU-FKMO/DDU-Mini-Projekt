<template>
    <h2 v-if="!focus">Prøver</h2>
    <div class="prøver" id="overview" v-if="!focus">
        <Prøve v-for="prøve in prøver" :klasse="prøve.klasse" :length="prøve.length" :date="prøve.date" :completed="prøve.completed" :id="prøve.id" :focus="false"></Prøve>
    </div>
    <h2 v-if="focus">Prøve</h2>
    <div id="focus">
        <Prøve v-if="focus" :klasse="focus.klasse" :length="focus.length" :date="focus.date" :completed="focus.completed" :id="focus.id" :focus="true"></Prøve>
    </div>
</template>

<script>
import Prøve from './Prøve.vue';
import {IO, getUserInfo} from '../../main';

export default {
    name: 'PrøveOverview',
    components: {Prøve},
    data: () => {
        return {
            prøveData: {},
            prøver: [],
            focus: null,
        };
    },
    methods: {
        setFocus(id) {
            console.log('Focus');
            this.focus = this.prøver.find((prøve) => {
                return prøve.id === id;
            });
        },
    },
    mounted() {
        //Get prøver from database
        let user = getUserInfo();
        IO.socket.emit('getPrøver', {user: user.id, session: window.localStorage.getItem('session')});
        IO.socket.on('prøveInfo', (data) => {
            this.prøveData = data;
            this.prøveData.forEach((prøve) => {
                this.prøver.push({
                    klasse: prøve.className,
                    length: prøve.questions.length,
                    date: prøve.date,
                    completed: false,
                    id: prøve.id,
                });
            });
        });
    },
};
</script>

<style scoped>
.prøver {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
</style>

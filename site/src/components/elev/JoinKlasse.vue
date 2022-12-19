<template>
    <h1>Tilslut ny klasse</h1>
    <h4 :style="{color: Acolor}" id="fejl" :key="message">{{ message }}</h4>
    <form name="klasse" action="/join-class" method="POST">
        <fieldset>
            <label for="inviteCode">Kode: </label>
            <input type="text" name="inviteCode" id="inviteCode" />
        </fieldset>
        <input type="hidden" name="userId" :value="userId" />
        <fieldset><input type="submit" value="Tilslut klasse" /></fieldset>
    </form>
</template>

<script>
import {getUserInfo} from '../../main';

export default {
    data() {
        return {
            userId: 0,
            message: '',
            Acolor: "",
        };
    },
    methods: {},
    mounted() {
        let userInfo = getUserInfo();
        this.userId = userInfo.id;
        console.log(this.userId);
        //Error
        console.log('Hash: ' + window.location.hash);
        if (window.location.hash == '#error') {
            this.message = "fejl"
            this.Acolor = "red"
            window.location.hash = '';
        } else if (window.location.hash == '#success') {
            this.message = 'Klasse tilsluttet';
            this.Acolor = "green";
        } else {
            let temp = window.location.hash.replaceAll('+', ' ');
            this.message = temp.replaceAll('#', '');
            this.Acolor = "red";
        }
        console.log(this.Acolor,this.message)
    },
};
</script>

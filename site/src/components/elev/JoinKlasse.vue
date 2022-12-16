<template>
    <h1>Tilslut ny klasse</h1>
    <h2 style="color: red" id="error"></h2>
    <h2 style="color: red" id="fejl" :key="error">{{ error }}</h2>
    <h2 style="color: greenyellow" id="sucess" :key="success">{{ success }}</h2>
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
            error: '',
            success: '',
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
            document.getElementById('error').innerHTML = 'Mislykkedes';
            window.location.hash = '';
        } else if (window.location.hash == '#success') {
            this.success = 'Klasse tilsluttet';
            window.location.hash = '';
        } else {
            this.error = window.location.hash.replaceAll('+', ' ');
            window.location.hash = '';
        }
    },
};
</script>

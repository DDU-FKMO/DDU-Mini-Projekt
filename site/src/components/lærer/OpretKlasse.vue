<template>
    <h1>Opret klasse</h1>
    <h2 style="color:red" id="error"></h2>
    <form name="klasse" action="/new-class" method="POST">
        <fieldset><label for="className">KlasseNavn: </label>
        <input type="text" name="className" id="className">
        </fieldset>
        <fieldset><label for="inviteCode">Kode: </label>
        <input type="text" name="inviteCode" id="inviteCode"> <button id="tilfældig" type="button" @click="randCode">Tilfældig
            kode til klassen</button></fieldset>
        <input type="hidden" name="userId" :value="userId">
        <fieldset><input type="submit" value="Opret klasse"></fieldset>
        
    </form>
     
</template> 

<script>
import { getUserInfo } from '../../main';

export default {
    data() {
        return {
            userId: 0,
        }
    },
    methods: {
        randCode()
        {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) 
            {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        document.getElementById('inviteCode').value = result;
        }
    },
    mounted() {
        let userInfo = getUserInfo();
        this.userId = userInfo.id;
        console.log(this.userId)
        var hash = window.location.hash.replace('#', '');
        if (hash != '') {
            if (hash == 'error') {
                document.getElementById("error").value = "Mislykkedes";
            }
        }
    },
}



</script>
<template>
    <h1>Tilslut ny klasse</h1>
    <h2 style="color:red" id="error"></h2>
    <h2 style="color: red" id="fejl">{{error}}</h2>
    <h2 style="color: greenyellow" id="sucess">{{succ}}</h2>
    <form name="klasse" action="/join-class" method="POST">
        <fieldset>
            <label for="inviteCode">Kode: </label>
            <input type="text" name="inviteCode" id="inviteCode">
        </fieldset>
        <input type="hidden" name="userId" :value="userId">
        <fieldset><input type="submit" value="Tilslut klasse"></fieldset>

    </form>
</template> 


<script>
import { getUserInfo } from '../../main';

export default {
    data() {
        return {
            userId: 0,
            error: "",
            succ: "",
        }
    },
    methods: {

    },
    mounted() {
        let userInfo = getUserInfo();
        this.userId = userInfo.id;
        console.log(this.userId);
        /*var hash = window.location.hash.replace('#', '');
        if (hash != '') {
            if (hash == 'error') {
                document.getElementById("error").innerHTML = "Mislykkedes";
            }
            else if (hash == 'success'){
                this.succ = "Klasse tilsluttet";
            }
            else{
                has2 = hash.replaceAll("+"," ");
                this.error = has2;
            }
        }*/
    },
}

</script>

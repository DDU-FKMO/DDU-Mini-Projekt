<template>
    <div class="content" id="red">
    <form name="klasse" action="/new-class" method="POST">
        <fieldset>
            <label for="className">Klassenavn: </label>
            <input type="text" name="className" id="className" />
        </fieldset>
        <fieldset><label for="inviteCode">Kode: </label> <input type="text" name="inviteCode" id="inviteCode" /> <button id="tilfældig" type="button" @click="randCode">Tilfældig kode</button></fieldset>
        <input type="hidden" name="userId" :value="userId" style="border: 0" />
        <fieldset><input type="submit" value="Opret klasse" /></fieldset>
    </form>
    </div>
</template> 

<script>
import {getUserInfo} from '../../main';

export default {
    data() {
        return {
            userId: 0,
        };
    },
    methods: {
        randCode() {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            document.getElementById('inviteCode').value = result;
        },
    },
    mounted() {
        let userInfo = getUserInfo();
        this.userId = userInfo.id;
        console.log(this.userId);
        var hash = window.location.hash.replace('#', '');
        if (hash != '') {
            if (hash == 'error') {
                document.getElementById('error').value = 'Mislykkedes';
            }
        }
    },
};
</script>

<style scoped>
fieldset {
    border: 0;
}
#tilfældig {
    color: var(--color-text);
    background-color: var(--color-background-soft);
    font-size: 1rem;
    width: auto;
    height: auto;
    cursor: pointer;
    border-color: var(--color-border-soft);
}
#tilfældig:hover {
    background-color: var(--color-background-soft);
    font-size: 1rem;
    border-color: var(--color-border-hover);
}
</style>

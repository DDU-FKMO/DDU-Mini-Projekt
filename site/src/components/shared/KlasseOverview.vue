<template>
    <h1>Klasser:</h1>
    <div class="klasser" >
        <Klasse v-for="klasse in klasser" :klasseNavn="klasse.className" :inviteCode="klasse.inviteCode"></Klasse>
    </div>
</template> 

<script>
//import { getUserInfo } from '../main.js';
import Klasse from "./Klasse.vue";

export default {
    name: "KlasseOverview",
    components: { Klasse },
    data: () => {
        return {
            klasser: [{ className: "3a2", inviteCode: "123" }, { className: "3c", inviteCode: "test" }, { className: "3h", inviteCode: "3924ef" }],
        }
    }
}
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
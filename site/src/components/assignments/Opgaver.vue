<template>
    <body>
        <button @click="state = 0">Tekstfelt</button>
        <button @click="state = 1">Knapper</button>
        <form>
            <input type="text" name="descriptionText" id="descriptionText" placeholder="Opgavebeskrivelse...">
        </form>
        <div v-if="state == 0">Svar tekst...</div>
        <form v-if="state == 1">
            <input type="text" name="response" id="multButton1" placeholder="Svar mulighed 1...">
            <input type="text" name="response" id="multButton2" placeholder="Svar mulighed 2...">
            <input type="text" name="response" id="multButton3" placeholder="Svar mulighed 3...">
            <input type="text" name="response" id="multButton4" placeholder="Svar mulighed 4...">
        </form>
        <button @click="state = true">Save</button>
    </body>
</template>

<script>
import { onMounted } from 'vue';

export default {
    data() {
        return {
            state: 0,
            save: false,
            responseOption1: '',
            responseOption2: '',
            responseOption3: '',
            responseOption4: ''
        }
    },
    mounted() {
        if (save) {
            responseOption1 = document.getElementById('multbutton1').value
            responseOption2 = document.getElementById('multbutton2').value
            responseOption3 = document.getElementById('multbutton3').value
            responseOption4 = document.getElementById('multbutton4').value
            save = false
        }
    }
}

</script>

<style scoped>
body {
    display: flex;
    justify-content: start;
    align-items: center;
}
</style>
<template>
    <body>
        <button @click="isMult = false">Tekstfelt</button>
        <button @click="isMult = true">Knapper</button>
        <form autocomplete="off">
            <input type="text" name="questionName" id="questionName" placeholder="Navn på opgave..."><br>
            <input type="text" name="descriptionText" id="descriptionText" placeholder="Opgavebeskrivelse..."><br>
            <input type="file" name="descriptionImage" id="descriotionImage" accept="image/*" @change="onFileChange">
        </form>
        <img v-if="url" :src="url"/>
        <div v-if="!isMult">Svar tekst...</div>
        <form v-if="isMult">
            <input type="text" name="response" id="multButton1" placeholder="Svar mulighed 1...">
            <input type="text" name="response" id="multButton2" placeholder="Svar mulighed 2..."><br>
            <input type="text" name="response" id="multButton3" placeholder="Svar mulighed 3...">
            <input type="text" name="response" id="multButton4" placeholder="Svar mulighed 4...">
        </form>
        <div v-if="isMult">Hvilken svarmulighed er korrekt?</div>
        <form v-if="isMult">
            <input type="radio" name="correct" id="correctOption1" value="1">
            <label for="correctOption1">Svarmulighed 1</label>
            <input type="radio" name="correct" id="correctOption2" value="2">
            <label for="correctOption2">Svarmulighed 2</label>
            <input type="radio" name="correct" id="correctOption3" value="3">
            <label for="correctOption3">Svarmulighed 3</label>
            <input type="radio" name="correct" id="correctOption4" value="4">
            <label for="correctOption4">Svarmulighed 4</label>
        </form>
        <button @click="save = true">Save</button>
    </body>
</template>

<script>
import { onMounted } from 'vue';

export default {
    data() {
        return {
            isMult: false,
            save: false,
            responseOption1: '',
            responseOption2: '',
            responseOption3: '',
            responseOption4: '',
            correctOption: 0,
            url: null
        }
    },
    mounted() {
        if (this.save) {
            responseOption1 = document.getElementById('multbutton1').value
            responseOption2 = document.getElementById('multbutton2').value
            responseOption3 = document.getElementById('multbutton3').value
            responseOption4 = document.getElementById('multbutton4').value
            correctOption = document.getElementsByName('correct').value
            save = false
        }
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
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
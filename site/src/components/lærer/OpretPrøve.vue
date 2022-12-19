<template>
    <div class="overview">
        <form name="prøve" action="/submit-test" method="POST">
            <input type="text" name="testName" placeholder="Navn på prøve...">
            <input type="text" name="className" placeholder="Klasse...">
            <input type="hidden" name="questions" :value="test.questions"> 
            <input type="submit" value="Opret prøve">
        </form>
    </div>
    <div class="overview">
        <div class="overview">
            <div v-for="question in test.questions">
                <a @click="loadQuestion(question)">{{question.questionName}}</a>
            </div>
        </div>
        <div class="OpgaveEditor">
            <button @click="isMult = false">Tekstfelt</button>
            <button @click="isMult = true">Knapper</button>
            <input type="text" id="questionName" placeholder="Navn på opgave..."><br>
            <input type="text" id="descriptionText" placeholder="Opgavebeskrivelse..."><br>
            <div>
                <div v-if="previewImage" class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }">
                </div>
                <input ref="fileInput" type="file" @input="pickFile">
            </div>
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
            <button @click="saveTest">Save</button>
        </div>
    </div>
</template>

<script>
import { appendToMemberExpression } from '@babel/types';

export default {
    data() {
        return {
            previewImage: false,
            isMult: false,
            correct: '',
            options: ['','','',''],
            test: {testName: '', questions: []},
        }
    },
    methods: {
        saveTest() {
            var name = document.getElementById('questionName').value
            var text = document.getElementById('descriptionText').value
            this.correct = document.getElementsByName('correct')||{}.value||'';
            this.options[0] = document.getElementById('multbutton1')||{}.value||'';
            this.options[1] = document.getElementById('multbutton2')||{}.value||'';
            this.options[2] = document.getElementById('multbutton3')||{}.value||'';
            this.options[3] = document.getElementById('multbutton4')||{}.value||'';
            var question = {questionName: name, inputText: text, inputImage: this.previewImage, isMult: this.isMult, responseOptions: this.options, correctOption: this.correct}
            this.test.questions.push(question)
        },
        pickFile () {
            let input = this.$refs.fileInput
            let file = input.files
            if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                this.previewImage = e.target.result
                }
                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])
            }
        },
        loadQuestion (question) {
            this.previewImage = question.inputImage
            this.isMult = question.isMult
            document.getElementById('questionName').value = question.questionName
            document.getElementById('descriptionText').value = question.inputText
            document.getElementsByName('correct').value = question.correctOption
            document.getElementById('multbutton1').value = question.responseOptions[0]
            document.getElementById('multbutton2').value = question.responseOptions[1]
            document.getElementById('multbutton3').value = question.responseOptions[2]
            document.getElementById('multbutton4').value = question.responseOptions[3]
        }
    }
}
</script>

<style scoped>
.overview {
    display: flex;
    flex-direction: column;
}
.OpgaveEditor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>
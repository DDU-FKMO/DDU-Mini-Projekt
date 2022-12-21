<template>
    <div class="content" id="green">
    <div class="overview">
        <form name="prøve" id="testForm" action="/submit-test" method="POST">
            <input type="text" id="testName" name="testName" placeholder="Navn på prøve...">
            <input type="text" name="className" placeholder="Klasse...">
            <input type="hidden" name="questions" :value="stringed"> 
            <button @click="submitForm">Opret Prøve</button>
        </form>
    </div>
    <div class="page">
        <div class="overview">
            <div v-for="question in test.questions">
                <a @click="loadQuestion(question)">{{question.questionName}}</a>
            </div>
        </div>
        <div class="OpgaveEditor">
            <button @click="isMult = false">Tekst besvarelse</button>
            <button @click="isMult = true">Multiple choice besvarelse</button>
            <input type="text" id="questionName" placeholder="Navn på opgave..."><br>
            <input type="text" id="descriptionText" placeholder="Opgavebeskrivelse..."><br>
            <div>
                <div v-if="previewImage" class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }">
                </div>
                <input ref="fileInput" type="file" @input="pickFile">
            </div>
            <div v-if="!isMult">Elevens svar tekst...</div>
            <div v-if="isMult">
                <input type="text" id="multButton1" placeholder="Svar mulighed 1...">
                <input type="text" id="multButton2" placeholder="Svar mulighed 2..."><br>
                <input type="text" id="multButton3" placeholder="Svar mulighed 3...">
                <input type="text" id="multButton4" placeholder="Svar mulighed 4...">
                <p>Hvilken svarmulighed er korrekt?</p>
                <input type="radio" name="correct" id="correctOption1" value="1" v-model="picked">
                <label for="correctOption1">Svarmulighed 1</label>
                <input type="radio" name="correct" id="correctOption2" value="2" v-model="picked">
                <label for="correctOption2">Svarmulighed 2</label>
                <input type="radio" name="correct" id="correctOption3" value="3" v-model="picked">
                <label for="correctOption3">Svarmulighed 3</label>
                <input type="radio" name="correct" id="correctOption4" value="4" v-model="picked">
                <label for="correctOption4">Svarmulighed 4</label>
            </div>
            <button @click="saveTest">Save</button>
        </div>
    </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            previewImage: false,
            isMult: false,
            picked: 5,
            test: {testName: '', questions: []},
            stringed: ''
        }
    },
    methods: {
        saveTest() {
            var name = document.getElementById('questionName').value
            var text = document.getElementById('descriptionText').value
            var options = ['','','','']
            if (document.getElementById('multButton1')) {
                options[0] = (document.getElementById('multButton1').value) ? document.getElementById('multButton1').value : ''
                options[1] = (document.getElementById('multButton2').value) ? document.getElementById('multButton2').value : ''
                options[2] = (document.getElementById('multButton3').value) ? document.getElementById('multButton3').value : ''
                options[3] = (document.getElementById('multButton4').value) ? document.getElementById('multButton4').value : ''
            }
            var question = {questionName: name, inputText: text, inputImage: this.previewImage, isMult: this.isMult, responseOptions: options, correctOption: this.picked}
            this.test.questions.push(question)            
            this.resetQuestion()
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
            this.picked = question.correctOption
            console.log(question.correctOption)
            if (question.correctOption < 5) {
                const wait = setTimeout(multSet, 10)
                function multSet() {
                    document.getElementById('multButton1').value = question.responseOptions[0]
                    document.getElementById('multButton2').value = question.responseOptions[1]
                    document.getElementById('multButton3').value = question.responseOptions[2]
                    document.getElementById('multButton4').value = question.responseOptions[3]
                }
            }
        },
        resetQuestion () {
            this.previewImage = false
            this.isMult = false
            document.getElementById('questionName').value = ''
            document.getElementById('descriptionText').value = ''
            this.picked = 5
            if (document.getElementById('multButton1')) {
                document.getElementById('multButton1').value = ''
                document.getElementById('multButton2').value = ''
                document.getElementById('multButton3').value = ''
                document.getElementById('multButton4').value = ''
            }
        },
        submitForm () {
            this.test.testName = document.getElementById('testName')
            this.stringed = JSON.stringify(this.test)
            document.getElementById('testForm').submit()
        }
    }
}
</script>

<style scoped>
.page {
    display: flex;
    flex-direction: row;
}
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
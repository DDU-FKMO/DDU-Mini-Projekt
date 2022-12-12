<template>
    <h1>Klasser:</h1>
    <button v-for="klasse in classes">{{klasse.className}}</button>
</template> 

<script>
//import { getUserInfo } from '../main.js';

export default {
    data: () => {
        return {
            classes: [{ className: "3a2" }, { className: "3c" }, { className: "3h" }],
        }
    }
}
</script>
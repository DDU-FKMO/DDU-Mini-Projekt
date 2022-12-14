<template>
    Prøve visning
</template>

<script>
import {getUserInfo} from '../../main';

export default {
    name:"PrøveVisning",
    data: () => {
        return {
            userInfo: {},
            prøveData: {}
        };
    },
    props: {id: null},
    mounted() {
        this.userInfo = getUserInfo();
        this.prøveData = this.$parent.getOpgave(this.id);
        console.log(this.prøveData);
    }
}
</script>
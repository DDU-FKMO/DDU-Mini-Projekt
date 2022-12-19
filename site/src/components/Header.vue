<template>
    <header>
        <a href="/">
            <img/>
            <h1>prøve<b>Indblik</b></h1>
        </a>
        <nav id="navbar"></nav>
    </header>
</template>

<script>
import {getLoggedIn, getUserInfo} from '../main';

export default {
    name: 'Header',
    data: () => {
        return {
            navItems: {},
        };
    },
    methods: {
        updateNavbar() {
            console.log('Updating navbar');
            if (getLoggedIn()) {
                var userInfo = getUserInfo();
                this.navItems = {'Se prøver': 'opgaver', 'Se Klasser': 'klasser'};
            }
            this.refreshFor();
        },
        refreshFor() {
            let element = document.getElementById('navbar');
            let html = '';
            for (let item in this.navItems) {
                html += `<a class="listItem" href="${this.navItems[item]}"> ${item} </a>`;
            }
            element.innerHTML = html;
        },
    },
    mounted() {
        this.updateNavbar();
    },
};
</script>

<style scoped>
header {
    height: 5rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0 0 0 3rem;
    background-color: var(--color-background-soft   );
}
b {
    font-weight: 800;
}
header a {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    color: #000000;
}
</style>

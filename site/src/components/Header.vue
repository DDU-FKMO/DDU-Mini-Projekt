<template>
    <header>
        <a href="/">
            <img src="/logo-square.png" alt="logo" />
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
                this.navItems = {'Se prøver': 'opgaver', 'Se klasser': 'klasser'};
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
    height: 10vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    background-color: var(--color-background-soft);
}
b {
    font-weight: 800;
}
header a {
    width: 20%;
    min-width: 20rem;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    font-size: 1.25rem;
    text-decoration: none;
    color: #000000;
}
header a img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
}
</style>

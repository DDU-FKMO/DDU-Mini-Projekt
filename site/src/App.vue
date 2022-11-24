<template>
    <Header></Header>
    <component :is="currentView" :key="currentPath" />
    <Footer></Footer>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import {defineComponent, getCurrentInstance} from 'vue';
import MainPage from './components/MainPage.vue';
import LoginPage from './components/login/Login.vue';
import RegPage from './components/login/register.vue';
import NotFound from './components/Page404.vue';
import Opgaver from './components/assignments/Opgaver.vue';

import {IO, getLoggedIn, setLoggedIn} from './main';
const routes = {
    '/': MainPage,
    '/login': LoginPage,
    '/register': RegPage,
    '/opgaver': Opgaver,
};
const names = {
    '/': 'Home',
    '/login': 'Login',
    '/register': 'Register',
    '/opgaver': 'Opgaver',
};

export default defineComponent({
    data: function () {
        return {
            currentPath: window.location.pathname,
            checkingSession: false,
        };
    },
    components: {
        Header,
        Footer,
    },
    computed: {
        currentView() {
            //Check login status
            var loggedIn = getLoggedIn();
            if (loggedIn) {
                console.log('Logged in');
                if (this.currentPath == '/login') {
                    this.currentPath = '/';
                }
            } else if (this.currentPath != '/login') {
                if (this.checkingSession == false) {
                    this.checkingSession = true;
                    IO.socket.emit('session', window.localStorage.getItem('session'));
                }
            }

            var newPage = routes[this.currentPath || '/'] || NotFound;
            if (newPage != NotFound) {
                var name = names[this.currentPath];
                document.title = name + ' | Title';
            } else {
                document.title = '404 - Not Found | Title';
            }
            return newPage;
        },
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.pathname;
        });
    },
});
</script>

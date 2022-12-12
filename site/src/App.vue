<template>
    <Header></Header>
    <main id="main"></main>
    <Footer></Footer>
</template>

<script>
//<component :is="currentView" :key="currentPath" />
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import {createApp, defineComponent, ref} from 'vue';
import MainPage from './components/MainPage.vue';
import LoginPage from './components/login/Login.vue';
import RegPage from './components/login/Register.vue';
import NotFound from './components/Page404.vue';
import Opgaver from './components/assignments/Opgaver.vue';
import Klasser from "./components/shared/KlasseOverview.vue";

import {IO, getLoggedIn, setLoggedIn} from './main';

const routes = {
    '/': {"page": MainPage, "title": "Home"},
    '/login': {"page": LoginPage, "title": "Login"},
    '/register': {"page": RegPage, "title": "Register"},
    '/opgaver': {"page":  Opgaver, "title": "Opgaver"},
    "/klasser": {"page": Klasser, "title": "Klasser"},
};

var Component = LoginPage;
var oldApp;

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
    methods: {
        updateView() {
            console.log("Loading page with path: " + this.currentPath);
            //Check login status
            var loggedIn = getLoggedIn();
            if (loggedIn) {
                ///console.log('Logged in');
                if (this.currentPath == '/login' || this.currentPath == '/register') {
                    window.history.pushState({}, "", "/");
                    this.currentPath = "/";
                }
                //Show page
                var newPage = routes[this.currentPath || '/'] || {"page": NotFound, "title": "404 - Not Found"};
                document.title = newPage.title + ' | Title';
                Component = newPage.page;
            } else if (this.currentPath != '/login' && this.currentPath != '/register') {
                ///console.log("Not logged in");
                if (this.checkingSession == false) {
                    this.checkingSession = true;
                    IO.socket.emit('session', window.localStorage.getItem('session'));
                    Component = null;
                } else {
                    return;
                }
            }
            if(oldApp) {
                oldApp.unmount();
            }
            oldApp = createApp(Component);
            oldApp.mount("#main");
            //Update navbar
            Header.methods.updateNavbar();
        },
        changePage(newPage) {
            window.history.pushState({}, "", location.origin + newPage);
            this.currentPath = newPage;
            this.updateView();
        }
    },
    mounted() {
        this.updateView();
    },
});
</script>

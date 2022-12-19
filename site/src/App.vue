<template>
    <Header></Header>
    <main id="main"></main>
    <Footer></Footer>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import {createApp, defineComponent, ref} from 'vue';
import NotFound from './components/Page404.vue';
import MainPage from './components/MainPage.vue';
//Login
import LoginPage from './components/login/Login.vue';
import RegPage from './components/login/Register.vue';
//Klasser
import Klasser from "./components/shared/KlasseOverview.vue";
import OpretKlasse from "./components/lærer/OpretKlasse.vue";
import JoinKlasse from './components/elev/JoinKlasse.vue';
//Opgaver
import Opgaver from './components/shared/PrøveOverview.vue';
import OpretOpgave from './components/lærer/OpretPrøve.vue';

import {IO, getLoggedIn, setLoggedIn} from './main';

const routes = {
    '/': {"page": MainPage, "title": "Home"},
    '/login': {"page": LoginPage, "title": "Login"},
    '/register': {"page": RegPage, "title": "Register"},
    '/opgaver': {"page":  Opgaver, "title": "Prøver"},
    "/klasser": {"page": Klasser, "title": "Klasser"},
    "/opret_klasse": {"page": OpretKlasse, "title": "Opret Klasse"},
    "/opret_opgave": {"page": OpretOpgave, "title": "Opret Prøve"},
    "/join_klasse": {"page": JoinKlasse, "title": "Join Klasse"}
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
                console.log('Logged in');
                if (this.currentPath == '/login' || this.currentPath == '/register') {
                    window.history.pushState({}, "", "/");
                    this.currentPath = "/";
                }
            } else if(this.currentPath != "/register" && this.currentPath != "/login") {
                console.log("Not logged in");
                if (this.checkingSession == false) {
                    console.log("Emit...");
                    this.checkingSession = true;
                    IO.socket.emit('session', window.localStorage.getItem('session'));
                    return;
                } else {
                    this.changePage("/login");
                    return;
                }
            }
            //Show page
            var newPage = routes[this.currentPath || '/'] || {"page": NotFound, "title": "404 - Not Found"};
            document.title = newPage.title + ' | Title';
            Component = newPage.page;
            //Mount...
            if(oldApp) {
                oldApp.unmount();
            }
            oldApp = createApp(Component);
            oldApp.mount("#main");
            //Update navbar
            Header.methods.updateNavbar();
        },
        changePage(newPage) {
            //console.log("App.vue: " + window.location.hash)
            console.log("Changing page to " + newPage);
            window.history.pushState({}, "", location.origin + newPage+ window.location.hash);
            this.currentPath = newPage;
            this.updateView();
        }
    },
    mounted() {
        this.updateView();
    },
});
</script>

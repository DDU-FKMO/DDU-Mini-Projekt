<template>
  <Header></Header>
  <component :is="currentView" />
  <Footer></Footer>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import {defineComponent} from 'vue';
import MainPage from "./components/MainPage.vue";
import LoginPage from "./components/login/Login.vue";
import RegPage from "./components/login/register.vue";
import NotFound from './components/Page404.vue';

import {IO, getLoggedIn, setLoggedIn} from "./main";
const routes = {
    '/': MainPage,
    '/login': LoginPage,
    '/register': RegPage
};
const names = {
    '/': 'Home',
    '/login': 'Login',
    '/register': 'Register'
};

export default defineComponent({
    data: function () {
        return {
            currentPath: window.location.pathname,
        };
    },
    components: {
      Header, Footer
    },
    computed: {
        currentView() {
            //Check login status
            var loggedIn = getLoggedIn();
            if(loggedIn) {
                if(this.currentPath == "/login") {
                    this.currentPath = "/";
                }
            } else if(this.currentPath != "/login") {
                IO.socket.emit("session", window.localStorage.getItem("session"));
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
            console.log("Logged in: " + getLoggedIn());
        });
        console.log("Logged in: " + getLoggedIn());
    },
});
</script>

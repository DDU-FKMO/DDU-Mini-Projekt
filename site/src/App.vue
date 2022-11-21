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
import NotFound from './components/Page404.vue';

const routes = {
    '/': MainPage,
    '/login': LoginPage
};
const names = {
    '/': 'Home',
    '/login': 'Login',
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

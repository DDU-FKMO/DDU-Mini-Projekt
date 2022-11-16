<template>
    <header>
        <h1>Title</h1>
        <nav>
            <a v-for:="item in Object.keys(navItems)" :href="'/' + navItems[item]">{{item}}</a>
        </nav>
    </header>
</template>

<script >
    export default {
        name: "Header",
        data: () => {
            return {
                navItems: {"Login": "login", "Se opgaver": "opgaver"}
            }
        },
        mounted() {
            
        }
    }
</script>

<style scoped>
    header {
        height: 5vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        background-color: var(--color-background-soft);
    }
    nav {
        width: 50%;
        height: 100%;
        margin: 0 1rem 0 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
    }
    nav a {
        min-width: 5rem;
        height: 100%;
        color: var(--color-text);
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }
    nav a:hover {
        background-color: #00000075;
    }
</style>
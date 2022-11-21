<template>
    <header>
        <a href="/">
            <h1>Title</h1>
        </a>
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
                navItems: {"Login": "login", "Se opgaver": "opgaver", "Test": "test"}
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
        padding: 0 0 0 3rem;
        background-color: var(--color-background-soft);
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
        color: var(--color-heading);
    }
    nav {
        width: 70%;
        height: 100%;
        margin: 0 0 0 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
    }
    nav a {
        height: 100%;
        color: var(--color-text);
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-size: 1.25rem;
        font-weight: 400;   
        flex: auto;
        transition: background-color 1s, font-weight 1s;
    }
    nav a:hover {
        background-color: #00000075;
        font-weight: 600;
    }
</style>
<template>
    <main>
        <form name="login" action="/login-post" method="POST">
            <fieldset>
                <label for="email">Email: </label>
                <input type="email" id="email" name="Email" required/>
            </fieldset>
            <fieldset>
                <label for="password">Password: </label>
                <input type="password" id="password" name="Password" required/>
            </fieldset>
            <input type="submit" id="submit" value="Login"/>
        </form>
        <button onclick="location.href = '/register'">Register new user</button>
    </main>
</template>

<script>
import {setLoggedIn} from "../../main";
export default {
    mounted() {
        var hash = window.location.hash.replace("#","");
        if(hash != "") {
            if(hash == "error") {
                setLoggedIn(false);
                alert("Brugernavn eller adgangskode var forkert!");
            } else {
                setLoggedIn(true);
                window.localStorage.setItem("session", hash);
                window.location.href = "/";
            }
        }
    }
}
</script>

<style scoped>
    main {
        justify-content: space-evenly;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 25%;
        padding: 2%;
        border: #000000 5px solid;
    }
    form fieldset {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 1.25rem;
    }
    form #submit {
        width: 75%;
        border-radius: 0;
        width: 10rem;
        height: 1.5rem;
        background-color: var(--color-background-mute);
        border-color: var(--color-border);
        transition: border-color 0.5s;
    }
    form #submit:hover {
        background-color: var(--color-background-soft);
        border-color: var(--color-border-hover);
    }


    button {
        border-radius: 0;
        width: 10rem;
        height: 1.5rem;
        background-color: var(--color-background-mute);
        border-color: var(--color-border);
        transition: border-color 0.5s;
    }
    button:hover {
        background-color: var(--color-background-soft);
        border-color: var(--color-border-hover);
    }

</style>


<template>
    <main>
        <form name="login" target="">
            <fieldset>
                <label for="email">Email: </label>
                <input type="email" id="email" name="Email" required/>
            </fieldset>
            <fieldset>
                <label for="password">Password: </label>
                <input type="password" id="password" name="Password" required/>
            </fieldset>
            <fieldset>
                <label for="type">User Type: </label>
                <select id="type" name="types" size="2" single required>
                    <option value="user">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </fieldset>
            <input type="submit" id="submit" value="Login"/>
        </form>
        <button>Register new user</button>
    </main>
</template>

<script>
import {IO} from "../../main";
export default {
    mounted() {
        if(window.location.search != "") {
            //Login
            let params = new URLSearchParams(location.search);
            let email = params.get("Email");
            let password = params.get("Password");
            let type = params.get("types");
            window.history.replaceState({}, document.title, "/" + "login");
            console.log(`Email:${email} Password:${password} Type:${type}`);
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


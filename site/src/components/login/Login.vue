<template>
    <main>
        <div class="content" id="blue">
        <form name="login" action="/login-post" method="POST">
            <div class="tabs">
                <a href="/login" id="login">
                    Login
                </a>
                <a href="/register" id="register">
                    Ny bruger
                </a>
            </div>
            <div>
                <fieldset>
                    <label for="email">Email: </label>
                    <input type="email" id="email" name="Email" required />
                </fieldset>
                <fieldset>
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="Password" required />
                </fieldset>
            </div>
            <input type="submit" id="submit" value="Login" />
        </form>
        </div>
    </main>
</template>

<script>
import {setLoggedIn} from '../../main';
export default {
    mounted() {
        var hash = window.location.hash.replace('#', '');
        if (hash != '') {
            if (hash == 'error') {
                setLoggedIn(false);
                alert('Brugernavn eller adgangskode var forkert!');
            } else {
                setLoggedIn(true);
                window.localStorage.setItem('session', hash);
                window.location.href = '/';
            }
        }
    },
};
</script>

<style scoped>
main {
    justify-content: space-evenly;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 50%;
    min-width: 25rem;
    min-height: 35rem;
    padding: 2rem;
    padding-top: 8rem;
    border: var(--color-border) 5px solid;
    background-color: var(--color-background-accent);
    border-radius: 5rem;
}
form fieldset {
    width: 20rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: none;
    color: var(--color-text);
    font-weight: 700;
    font-size: 1.25rem;
}
form fieldset input {
    width: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: var(--color-text);
    border: var(--color-border) 2px solid;
    background-color: var(--color-background-soft);
    font-weight: 500;
    font-size: 0.8rem;
}
form fieldset input:hover {
    border-color: var(--color-border-hover);
}

.tabs {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
    height: 5rem;
    top: 0;
    border-top-left-radius: 4.5rem;
    border-top-right-radius: 4.5rem;
    border: var(--color-border) 5px solid;
    overflow: hidden;
}
.tabs a {
    width: 50%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
    font-weight: 700;
    font-size: 1.25rem;
    text-decoration: none;
    transition: color 300ms;
    background-color: var(--color-accent-1);
}
#login {
    background-color: var(--color-border);
}
.tabs a:hover, #login:hover {
    background-color: var(--color-border-hover);
}
</style>

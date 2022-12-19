<template>
    <main>
            <form name="register" class="form-group" action="/register-post" method="POST">
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
                        <input v-model="emailReg" type="email" id="email" name="Email" required />
                    </fieldset>
                    <fieldset>
                        <label for="name">Name: </label>
                        <input v-model="nameReg" type="text" id="name" name="Name" required />
                    </fieldset>
                    <fieldset>
                        <label for="password">Password: </label>
                        <input v-model="passReg" type="password" id="password" name="Password" required />
                    </fieldset>
                    <fieldset>
                        <label for="type">User Type: </label>
                        <select id="type" name="types" size="2" v-model="userType" single required>
                            <option value="user">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </fieldset>
                </div>
                <input type="submit" id="submit" value="Register" @click="doRegister" />
            </form>
    </main>
</template>

<script>
export default {
    mounted() {
        var hash = window.location.hash.replace('#', '');
        if (hash != '') {
            if (hash == 'error') {
                setLoggedIn(false);
                alert('Brugernavn eller adgangskode var forkert!');
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
form fieldset input, form fieldset select {
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
form fieldset input:hover, form fieldset select:hover  {
    border-color: var(--color-border-hover);
}
form #submit, button {
    border-radius: 2rem;
    width: 15rem;
    height: 4rem;
    background-color: var(--color-background-mute);
    border-color: var(--color-border);
    transition: border-color 300ms background-color 400ms;
}
form #submit:hover, button:hover {
    border-color: var(--color-border-hover);
    background-color: var(--color-border);
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
#register {
    background-color: var(--color-border);
}
.tabs a:hover, #register:hover {
    background-color: var(--color-border-hover);
}
</style>

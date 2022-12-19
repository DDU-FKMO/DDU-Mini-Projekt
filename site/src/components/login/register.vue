<template>
    <main>
        <div id="app">
            <h1>Register</h1>
            <form name="register" class="form-group" action="/register-post" method="POST">
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
                <input type="submit" id="submit" value="Register" @click="doRegister" />
            </form>
            <a href="/login">
                <button href="/register" onclick="location.href = '/register';">Have an account? Login</button>
            </a>
        </div>
    </main>
</template>

<script>
export default {
    mounted() {
        var hash = window.location.hash.replace('#', '');
        console.log(hash);
        if (hash != '') {
            if (hash == 'error') {
                setLoggedIn(false);
                alert('Denne email eksisterer allerede');
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

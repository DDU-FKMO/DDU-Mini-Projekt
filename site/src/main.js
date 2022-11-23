import {io} from 'socket.io-client';
var loggedIn = false;
export function setLoggedIn(value) {loggedIn = value}
export function getLoggedIn() {return loggedIn}
/*For testing:*/ loggedIn = true;

//Connection with server
export var IO = {
    socket: io(),
    init: function () {
        IO.bindEvents();
    },

    bindEvents: function () {
        IO.socket.on('connected', IO.onConnected);
        IO.socket.on('error', function (e) {
            console.error(e);
        });
        //Session
        IO.socket.on("session", (approved) => {
            console.log("Data: " + approved);
            setLoggedIn(approved);
            if(approved) {
                if(window.location.pathname == "/login") {
                    window.location.pathname = "/";
                }
            } else {
                window.location.pathname = "/login";
            }
        });
    },

    onConnected: function () {
        console.log("Succesfully connected to server (" + IO.socket.id + ")");
        IO.socket.emit("test");
    },

    error: function (data) {
        alert('Something went wrong' + data);
    },
};
IO.init();

//Mount App
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

createApp(App).mount('body');
window.sessionStorage.setItem("Test","test");
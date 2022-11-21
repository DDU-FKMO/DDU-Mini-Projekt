import {io} from 'socket.io-client';

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
    },

    onConnected: function () {
        console.log("Succesfully connected to server");
        console.log("Socket id: " + IO.socket.id);
        IO.socket.emit("test");
    },

    error: function (data) {
        alert('Something went wrong');
    },
};
IO.init();


//Mount App
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

createApp(App).mount('body');



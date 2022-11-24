import {io} from 'socket.io-client';
var loggedIn = true;

var userId;
export function setLoggedIn(value, user) {
    loggedIn = value;
    userId = user;
}
export function getLoggedIn() {
    return loggedIn;
}

//Connection with server
export var IO = {
    socket: io(),
    init: function () {
        IO.bindEvents();
    },

    bindEvents: function () {
        IO.socket.on('connected', IO.onConnected);
        IO.socket.on('error', IO.error);
        //Session
        IO.socket.on('session', (data) => {
            setLoggedIn(data.approved, data.userId);
            if (data.approved) {
                if (window.location.pathname == '/login' || window.location.pathname == '/register') {
                    window.location.pathname = '/';
                }
            } else {
                if (window.location.pathname != '/login' && window.location.pathname != '/register') {
                    window.location.pathname = '/login';
                }
            }
        });
    },

    onConnected: function () {
        console.log('Succesfully connected to server (' + IO.socket.id + ')');
        //IO.socket.emit('test');
    },

    error: function (data) {
        alert('Something went wrong \n' + data);
    },
};
IO.init();

//Mount App
import {createApp} from 'vue';
import App from './App.vue';
import './assets/main.css';

createApp(App).mount('body');
window.sessionStorage.setItem('Test', 'test');

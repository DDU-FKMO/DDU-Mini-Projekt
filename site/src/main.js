import {io} from 'socket.io-client';
var loggedIn = false;

var userInfo = {id: 0, name: "Test", teacher: true};
export function setLoggedIn(value, user) {
    loggedIn = value;
    userInfo = user;
    console.log("Updated user");
    console.log(user);
}
export function getLoggedIn() {
    return loggedIn;
}
export function getUserInfo() {
    return userInfo;
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
            setLoggedIn(data.approved, data.user);
            if (data.approved) {
                if (window.location.pathname == '/login' || window.location.pathname == '/register') {
                    window.history.pushState({}, "", "/");
                    App.data().currentPath = "/";
                }
                App.methods.updateView();
            } else {
                if (window.location.pathname != '/login' && window.location.pathname != '/register') {
                    window.history.pushState({}, "", "/login");
                    App.data().currentPath = "/login";
                }
                App.methods.updateView();
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

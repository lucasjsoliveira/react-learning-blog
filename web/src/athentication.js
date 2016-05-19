/**
 * Created by lucas on 17/05/16.
 */
import {postJson, fetchJson} from './fetch-json';
import EventManager from './event-manager';
import {notification, notificationTypes} from './components/notification';

var user = null;
var evLoginSuccess = new EventManager();
var evLoginFailed = new EventManager();
var evLogout = new EventManager();

var reload = function () {
    window.location.reload();
};

export var authenticator = {
    requestLogin: function (user, password) {
        postJson('/api/site/login', {login: user, senha: password}).then(function (data) {
            if (!data.success) {
                evLoginFailed.notify(data.message);
                notification.add(data.message, notificationTypes.WARNING);
                return;
            }

            user = data.usuario;
            evLoginSuccess.notify(user);
            reload();
        });
    },
    logout: function () {
        postJson('/api/site/logout', {}).then(function () {
            user = null;
            evLogout.notify();
            reload();
        });
    },
    fetchUser: function () {
        // Caso já exista usuário logado, retornar promise resolvida com o usuário
        if (user != null) {
            return new Promise(function (resolve) {
                resolve(user);
            });
        }

        var promise = fetchJson('/api/site/get-user');

        promise.then(function (data) {
            if (typeof data == 'string') {
                user = null;
            }

            user = data;
        });

        return promise;
    },
    isLogged: function () {
        return user !== null;
    },
    onLoginSuccess: function (fn) {
        evLoginSuccess.addListener(fn);
    },
    onLoginFailed: function (fn) {
        evLoginFailed.addListener(fn);
    },
    onLogout: function (fn) {
        evLogout.addListener(fn);
    }
};

authenticator.fetchUser();

/**
 * Created by lucas on 14/04/16.
 */

/**
 *
 * @param url
 * @returns {Promise}
 */
var fetchJson = function fetchJson(url) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            resolve(data);
        });
    });
};

var postJson = function postJson(url, data) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            resolve(data);
        })
    });
};

export {
    fetchJson,
    postJson
}

import $ from 'jquery';

const URL_BASE = 'https://api.github.com';

export default class Service {
    getRepo() {
        const relUrl = '/repos/villupp/reactdev';
        return new Promise((resolve, reject) => {
            doRequest('GET', relUrl,
                function res(res) {
                    resolve(res);
                },
                function(err) {
                    console.error(JSON.stringify(err));
                    reject(err);
                }
            );
        });
    }
}

function doRequest(method, relativeUrl, onSuccess, onError, headers = {}) {
    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    /* Add default headers */
    for (var header in defaultHeaders) {
        if (!headers.hasOwnProperty(header))
            headers[header] = defaultHeaders[header];
    }

    $.ajax({
        method: method,
        url: `${URL_BASE}${relativeUrl}`,
        headers: headers,
        success: onSuccess,
        error: onError
    });
}
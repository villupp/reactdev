import $ from 'jquery';

const URL_BASE = 'https://api.github.com';
const CLIENT_ID = 'ffd682caab6b6c6b8ffe';
const KEY = '';

export default class Service {
    getRepo(repoFullName) {
        console.log('getrepo ' + repoFullName);
        const relUrl = `/repos/${repoFullName}?client_id=${CLIENT_ID}&client_secret=${KEY}`;
        return new Promise((resolve, reject) => {
            resolve({
                name: 'reactdev',
                url: 'https://api.github.com/repos/villupp/reactdev',
                id: 1,
                description: 'mock description'
            });
        });
        // return new Promise((resolve, reject) => {
        //     doRequest('GET', relUrl,
        //         function res(res) {
        //             resolve(res);
        //         },
        //         function(err) {
        //             console.error(JSON.stringify(err));
        //             reject(err);
        //         }
        //     );
        // });
    }

    getCommits(repoFullName) {
        console.log('getCommits ' + repoFullName);
        const relUrl = `/repos/${repoFullName}/commits?client_id=ffd682caab6b6c6b8ffe&client_secret=e8510c7548e15e85c2b584a0b15c1af278f2b64d`;
        // return new Promise((resolve, reject) => {
        //     resolve([{
        //         sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc7',
        //         commit: {
        //             author: {
        //                 name: 'Ville Piirainen',
        //                 email: 'ville.piirainen@cgi.com',
        //                 date: '2018-04-10T16:29:09Z'
        //             },
        //             message: 'Nice commit'
        //         }
        //     }, {
        //         sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc7',
        //         commit: {
        //             author: {
        //                 name: 'Ville Piirainen',
        //                 email: 'ville.piirainen@cgi.com',
        //                 date: '2018-04-06T16:15:09Z'
        //             },
        //             message: 'Another commit'
        //         }
        //     }, {
        //         sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc7',
        //         commit: {
        //             author: {
        //                 name: 'Ville Piirainen',
        //                 email: 'ville.piirainen@cgi.com',
        //                 date: '2018-04-05T16:02:09Z'
        //             },
        //             message: 'Nice commit'
        //         }
        //     }]);
        // });
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
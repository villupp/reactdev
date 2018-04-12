const URL_BASE = 'https://api.github.com';
const CLIENT_ID = 'ffd682caab6b6c6b8ffe';
const KEY = '';
const mock = true;

export default class Service {
    getRepo(repoFullName) {
        const relUrl = `/repos/${repoFullName}?client_id=${CLIENT_ID}&client_secret=${KEY}`;

        if (mock) {
            var id = Math.random().toString();
            id = id.substring(2, id.length - 1);
            return new Promise((resolve, reject) => {
                resolve({
                    name: repoFullName,
                    url: `https://api.github.com/repos/${repoFullName}`,
                    id: id,
                    description: 'mock description'
                });
            });
        } else {
            return getFetch(relUrl)
                .then((res) => {
                    console.log(`getRepo | Got response: ${(res.ok ? 'OK' : 'NOT OK')}, status ${res.status}: ${res.statusText}`);
                    return res.json();
                });
        }
    }

    getCommits(repoFullName) {
        const relUrl = `/repos/${repoFullName}/commits?client_id=${CLIENT_ID}&client_secret=${KEY}`;

        if (mock) {
            return new Promise((resolve, reject) => {
                resolve([{
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc1',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-10T16:29:09Z'
                        },
                        message: 'Nice commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc2',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-06T16:15:09Z'
                        },
                        message: 'Another commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc3',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-05T16:02:09Z'
                        },
                        message: 'Nice commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc4',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-10T16:29:09Z'
                        },
                        message: 'Nice commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc5',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-10T16:29:09Z'
                        },
                        message: 'Nice commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc6',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-10T16:29:09Z'
                        },
                        message: 'Nice commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc7',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-10T16:29:09Z'
                        },
                        message: 'Nice commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc8',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-10T16:29:09Z'
                        },
                        message: 'Nice commit'
                    }
                }, {
                    sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc9',
                    commit: {
                        author: {
                            name: 'Ville Piirainen',
                            email: 'ville.piirainen@cgi.com',
                            date: '2018-04-10T16:29:09Z'
                        },
                        message: 'Nice commit'
                    }
                }]);
            });
        } else {
            return getFetch(relUrl)
                .then((res) => {
                    console.log(`getCommits | Got response: ${(res.ok ? 'OK' : 'NOT OK')}, status ${res.status}: ${res.statusText}`);
                    return res.json();
                });
        }
    }
}

function getFetch(relativeUrl, httpHeaders = {}) {
    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    /* Add default headers */
    for (var header in defaultHeaders) {
        if (!httpHeaders.hasOwnProperty(header))
            httpHeaders[header] = defaultHeaders[header];
    }

    var reqSettings = {
        method: 'GET',
        headers: new Headers(httpHeaders),
        cache: 'default'
    };

    var req = new Request(`${URL_BASE}${relativeUrl}`, reqSettings);
    return fetch(req);
}
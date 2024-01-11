import axios from "axios";

// const Connection = () => {
//     // var server = window.location.hostname;
//     // var servicePort = window.location.protocol.indexOf("htpps") > -1 ? 8081 : 8080;
//     // var service = `${window.location.protocol}//${server}:${servicePort}/`;
//     var server = window.location.hostname;
//     var servicePort = window.location.protocol.indexOf("htpps") > -1 ? 8081 : 8080;
//     var service = `${window.location.protocol}//${server}:${servicePort}/`;
//     return service
// }

const api = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        'Accept': '*/*',
        'Authorization':
             'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNTA2MTg2N30.1XkgjJeKD_kAjgIFI334iO3-jh-_8qBzM6wZrbgTXT9LkO3ykQQWbQFKVWiDBQPZe18FZ5Trzs1EWQ1QB3ikIg',
    }
});

export default api;
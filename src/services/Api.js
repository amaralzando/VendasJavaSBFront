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
             'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNDk3ODg3MX0.xiZQFPoWgJo65HhpcdbypzDpQE8sMdCF6gkZtDLn-VdxpcCre1oM22M-3oTmxFH6VMN6RoHWGx30wzCkV7goXw',
    }
});

export default api;
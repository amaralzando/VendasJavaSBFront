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
             'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNDMwODEzNX0.FR-Du4YMLFiWQG5gbOfhKom0TH8U3Wolw7lLUP3w-VG5OJeMXneMOYpEYkEUFQXan-8idGrCwCG1dRnpOLXTcg',
    }
});

export default api;
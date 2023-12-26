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
             'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwMzAxNDMxMX0.HXR-qBK6_WoGo9YflH41ulyu6hxfpD_mMLRpWVbEgP0Rkok0ZYRdNvjm3ka6wb5vt-x_gCmIVAXbaguz1-Uufw',
    }
});

export default api;
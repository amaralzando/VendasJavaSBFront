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
        "Content-Type": "application/json",
        "Authorization": 
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNDI0MDE3MH0.v-PbQhgXlGYgyvu608pd9qeQOkUv_QEKGA9IQ0Cl-0NlfcLlPYRx_uUv1B6KQLSsgO3t9oYsIS81GAE4RgfbNQ"
    }
});

export default api;
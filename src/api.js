import axios from 'axios'
import project from './assets/project.js'

const api = axios.create({
    // baseURL: 'https://api.tom-zapico.com/',
    baseURL: project.links.api,
});
// api.interceptors.request.use(
//     config => {
//         // console.log(`api ${config.method} ${config.url}`);
//         return config;
//     },
// );
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api
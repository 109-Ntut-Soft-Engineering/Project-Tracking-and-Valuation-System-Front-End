import axios from 'axios';
import { APIKey } from '../tool/Token';



const projectAPi = axios.create({
    baseURL: "http://localhost:5000/project",
    timeout: 10000
})


// delete axios.defaults.headers.common["Authorization"];
// axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token')).idToken}`;

// axios.interceptors.request.use(function (config) {
//     const idToken = JSON.parse(localStorage.getItem('token')).idToken
//     if (idToken) {
//         config.headers = {
//             Authorization: `Bearer ${idToken}`
//         }
//     }
//     console.log(idToken)
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

const requestProjectCodeFreq = (data) => projectAPi.get('code_freq/' + data.name)
const signUp = (data) => axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + APIKey, data, { headers: { 'Authorization': '' } })
const saveUserInfo = (data) => axios.post('http://127.0.0.1:5000/user', data)
const signIn = (data) => axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APIKey, data)
export { requestProjectCodeFreq, signUp, signIn, saveUserInfo }
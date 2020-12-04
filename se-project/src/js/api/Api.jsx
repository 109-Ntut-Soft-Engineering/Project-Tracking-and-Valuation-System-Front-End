import axios from 'axios';

const projectAPi = axios.create({
    baseURL: "http://localhost:5000/project",
    timeout: 10000
})




const requestProjectCodeFreq = (data) => projectAPi.get('code_freq/' + data.name)
export {requestProjectCodeFreq}
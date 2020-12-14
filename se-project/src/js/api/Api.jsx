import axios from 'axios';

const projectAPi = axios.create({
    baseURL: "http://localhost:5000/project",
    timeout: 10000
})

const requestProjectCodeFreq = (data) => projectAPi.get('code_freq/' + data.name)
export {requestProjectCodeFreq}


const requestUserProjects = () => projectAPi.get()
export {requestUserProjects}

const requestAddNewProject = (data) => projectAPi.get(data.name)
export {requestAddNewProject}

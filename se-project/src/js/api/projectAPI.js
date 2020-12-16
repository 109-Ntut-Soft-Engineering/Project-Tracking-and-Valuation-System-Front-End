import { req } from './api'


export const requestProjectCodeFreq = (pid) => {
    return req.get(`project/${pid}/code_freq`)
}

export const requestUserProjects = () => {
    return req.get('projects')
}

export const addNewProject = (data) => {
    return req.post(`projects?name=` + data.name)
}

export const saveUserProjectRepos = (pid, data) => {
    return req.patch(`project/${pid}/repos`, data)
}
export const removeUserProjectRepos = (pid, data) => {
    return req.patch(`project/${pid}/repos`, data)
}
export const getUserProjectRepos = (pid) => {
    return req.get(`project/${pid}/repos`)
}

export const getUserRepos = (pid) => {
    return req.get(`project/AvailRepository/${pid}`)
}
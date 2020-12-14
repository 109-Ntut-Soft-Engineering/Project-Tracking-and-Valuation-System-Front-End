import { req } from './api'


export const requestProjectCodeFreq = (data) => {
    return req.get('project/code_freq/' + data.name)
}

export const requestUserProjects = () => {
    return req.get('projects')
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
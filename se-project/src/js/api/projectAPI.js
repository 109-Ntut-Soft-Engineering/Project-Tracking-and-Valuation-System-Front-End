import { req } from './api'

const project = 'project'
export const requestProjectCodeFreq = (data) => {
    return req.get(project + 'code_freq/' + data.name)
}

export const requestUserProjects = () => {
    return req.get(project)
}

export const addNewProject = (data) => {
    return req.post(`${project}` , data)
}

export const saveUserProjectRepos = (data) => {
    return req.patch(`${project}/${window.currentProject.id}`, data)
}
export const removeUserProjectRepos = (data) => {
    return req.patch(`${project}/${window.currentProject.id}`, data)
}
export const getUserProjectRepos = (data) => {
    return req.get(`${project}/${window.currentProject.id}`)
}
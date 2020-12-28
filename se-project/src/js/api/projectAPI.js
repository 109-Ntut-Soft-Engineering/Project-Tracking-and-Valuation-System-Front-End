import { req } from './api'

export const requestProjectCodeFreq = (pid) => {
    return req.get(`project/${pid}/code_freq`)
}

export const requestProjectCompareCodeFreq = (pid1, pid2) =>{
    return req.get(`project/compare/${pid1}/${pid2}/code_freq`)
}
export const requestUserProjects = () => {
    return req.get('projects')
}

export const requestTotalCommit = (pid) => {
    return req.get(`project/${pid}/commit`)
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

export const updateProject = (pid, data) => {
    return req.patch(`project/${pid}/setting`, data)
}

export const getProjectSetting = (pid) => {
    return req.get(`project/${pid}/setting`)
}

export const delProject = (pid) => {
    return req.delete(`project/${pid}/setting`)
}

export const requestProjectWeekCommit = (pid) => {
    return req.get(`project/${pid}/week_commit`)
}

export const requestProjectIssueMessage = (pid) => {
    return req.get(`project/${pid}/issue`)
}

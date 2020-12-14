import { req } from './api'

const project = 'project'
export const requestProjectCodeFreq = (data) => {
    return req.get(project + '/code_freq/' + data.name)
}

export const requestUserProjects = () => {
    return req.get(project)
}

export const requestProjectIssueMessage = (data) => {
    return req.get(project + '/issue/' + data.name)
}
import { req,Method } from './api'

const project = 'project'
export const requestProjectCodeFreq = (data) => {
    return req(Method.get, project + '/code_freq/' + data.name)
}

export const requestUserProjects = () => {
    return req(Method.get, project)
}

// export const addNewProject = (data) => {
//     return req(Method.post, project +'?name='+ data.name)
// }
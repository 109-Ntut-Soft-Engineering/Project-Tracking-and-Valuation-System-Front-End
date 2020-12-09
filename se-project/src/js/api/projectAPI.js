import { req,Method } from './api'

const project = 'project/'
export const requestProjectCodeFreq = (data) => {
    return req(Method.get, project + 'code_freq/' + data.name)
}
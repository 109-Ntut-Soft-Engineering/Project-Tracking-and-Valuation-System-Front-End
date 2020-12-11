import { req } from './api'

const project = 'project/'
export const requestProjectCodeFreq = (data) => {
    return req.get(project + 'code_freq/' + data.name)
}
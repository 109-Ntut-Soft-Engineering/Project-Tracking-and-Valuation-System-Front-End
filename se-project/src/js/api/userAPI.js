import { req } from './api'
import axios from 'axios';
import { APIKey } from '../tool/CommonTool'

export const userSignUp = (signUpData) => {
    return req.post('signUp', signUpData)
}

export const userLogin = (logInData) => {
    return req.post('login', logInData)
}

export const saveUserInfo = (info) => {
    return req.post('user', info)
}

export const linkGithub = (code) => {
    return req.post('user/auth', code)
}

export const getUserInfo = () => {
    return req.get('user')
}
export const updateUserInfo = (data) => {
    return req.patch('user', data)
}
import { req, Method } from './api'
import axios from 'axios';
import { APIKey } from '../tool/Token'
const firebaseSignUpAPI = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`
const firebaseSingInAPI = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`

export const userSignUp = (signUpData) => {
    return axios.post(firebaseSignUpAPI, signUpData)
}

export const userLogIn = (logInData) => {
    return axios.post(firebaseSingInAPI, logInData)
}

export const saveUserInfo = (info) => {
    return req(Method.post, 'user', info)
}

export const linkGithub = (code) => {
    return req(Method.post, 'user/auth', code)
}
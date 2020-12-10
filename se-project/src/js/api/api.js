import axios from 'axios';
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { APIKey } from '../tool/Token'
import qs from 'qs'
const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000
})
function getTokenData() {
    return JSON.parse(localStorage.getItem('token'))
}


export const Method = Object.freeze({
    post: 'post',
    get: 'get',
    delete: 'delete',
    put: 'put',
    patch: 'patch'
})

export function req(method, url, data = null) {
    method = method.toLowerCase();
    switch (method) {
        case Method.post:
            return api.post(url, data);
        case Method.get:
            return api.get(url, { params: data });
        case Method.delete:
            return api.delete(url, { params: data });
        case Method.put:
            return api.put(url, data);
        case Method.patch:
            return api.patch(url, data);
        default:
            console.log(`未知的 method: ${method}`);
            return false;
    }
}

api.interceptors.request.use(
    function (config) {
        const data = localStorage.getItem('token')
        const token = data !== undefined ? `Bearer ${JSON.parse(data).idToken}` : '';
        config.headers.Authorization = token;
        return config;
    }
);

const refreshAuthLogic = failedRequest =>
    axios
        .post(`https://securetoken.googleapis.com/v1/token?key=${APIKey}`, qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: getTokenData().refreshToken
        }))
        .then(tokenRefreshResponse => {
            const data = tokenRefreshResponse.data
            window.localStorage.setItem('token',
                JSON.stringify({
                    idToken: data.id_token,
                    refreshToken: data.refresh_token
                }))
            failedRequest.response.config.headers["Authorization"] =
                "Bearer " + tokenRefreshResponse.data.id_token;
            return Promise.resolve();
        })
        .catch(error => {
            console.log("refresh fail");
            localStorage.setItem("token", null);
            return Promise.reject(error);
        });

createAuthRefreshInterceptor(api, refreshAuthLogic);
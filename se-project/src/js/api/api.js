import axios from 'axios';
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { APIKey } from '../tool/CommonTool'
import qs from 'qs'
const api = axios.create({
    baseURL: "http://localhost:5000",
    // timeout: 600000
})
function getTokenData() {
    return JSON.parse(localStorage.getItem('token'))
}


export const req = Object.freeze({
    post: function (url, data = null) {
        return api.post(url, data)
    },
    get: function (url, data = null) {
        return api.get(url, { params: data })
    },
    delete: function (url, data = null) {
        return api.delete(url, { params: data })
    },
    put: function (url, data = null) {
        return api.put(url, data)
    },
    patch: function (url, data = null) {
        return api.patch(url, data)
    }
})

api.interceptors.request.use(
    function (config) {
        const data = localStorage.getItem('token')
        if (data != null) {
            const token = data !== undefined ? `Bearer ${JSON.parse(data).idToken}` : '';
            config.headers.Authorization = token;
        }
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
import axios from 'axios';



const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000
})

export function req(method, url, data = null) {
    method = method.toLowerCase();
    switch (method) {
        case "post":
            return api.post(url, data);
        case "get":
            return api.get(url, { params: data });
        case "delete":
            return api.delete(url, { params: data });
        case "put":
            return api.put(url, data);
        case "patch":
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


// const requestProjectCodeFreq = (data) => projectAPi.get('code_freq/' + data.name)
// const signUp = (data) => axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + APIKey, data, { headers: { 'Authorization': '' } })
// const saveUserInfo = (data) => userInstance.post('http://127.0.0.1:5000/user', data)
// const signIn = (data) => axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APIKey, data)
// export { requestProjectCodeFreq, signUp, signIn, saveUserInfo }
import axios from 'axios'

const AxiosInstance = axios.create({
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
    }
})

AxiosInstance.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('api_key');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

AxiosInstance.interceptors.response.use(function (response) {

    return response;
}, function (error) {
    if (error.response.status == 401) {
        sessionStorage.removeItem('api_key')
        window.location.reload()
    }
    return Promise.reject(error);
});

export default AxiosInstance
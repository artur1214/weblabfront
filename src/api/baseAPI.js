import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";
import {logDOM} from "@testing-library/react";

export const getToken = () => {
    return localStorage.getItem('JWT')
}
const token = getToken;

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
});
axiosInstance.interceptors.request.use((req) => {
    if (token()) {
        req.headers.Authorization = `Bearer ${token()}`;
    }
    return req;
})

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        console.log(err.config)
        if (originalConfig.url !== "/token/refresh/" && err.response) {            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                if (err.response.data.code === 'token_not_valid') {
                    try {
                        const rs = await axiosInstance.post("/token/refresh/", {
                            refresh: localStorage.getItem('JWTRefresh')
                        });
                        const {access} = rs.data;
                        localStorage.setItem('JWT', access)
                        return axiosInstance(originalConfig);
                    } catch (_error) {

                        return Promise.reject(_error);
                    }
                }
                else{
                    return Promise.reject(err)
                }
            }
        }
        else if (originalConfig.url === "/token/refresh/") {
            dropJWT()
            window.location.reload()
        }
        return Promise.reject(err);

    }
);

export function getTokenAPI(data) {
    return axiosInstance.post('token/', data)
}
export function getSteamTokenAPI(data) {
    return axiosInstance.post()
}

export function getUserAPI() {
    return axiosInstance.get('current_user/')
}

export function useUser() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        getUserAPI().then((res) => {
            setUser(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return user
}


export function dropJWT() {
    localStorage.removeItem('JWT')
    localStorage.removeItem('JWTRefresh')
}

export function getVkToken(code){
    return axiosInstance.get('http://localhost:8000/api/vk_token' + code)
}
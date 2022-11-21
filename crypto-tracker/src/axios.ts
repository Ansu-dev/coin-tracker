import axios, { AxiosInstance } from "axios";


//api instance 모듈화
export const api: AxiosInstance = axios.create({
    baseURL: 'https:/api.coinpaprika.com/v1'
})
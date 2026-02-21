import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    timeout:30000,
    headers:{
        'content-Type': 'application/json'
    },
    timeout:10000,
});
import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");
const thaliaAPI = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
    }
});

export default thaliaAPI;
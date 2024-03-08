import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const thaliaAPI = axios.create({
    baseURL
});

export default thaliaAPI;
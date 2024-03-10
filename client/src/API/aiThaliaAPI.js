import axios from 'axios';
const baseURL = import.meta.env.VITE_AI_BASE_URL;
const aiThaliaAPI = axios.create({
    baseURL,
});

export default aiThaliaAPI;
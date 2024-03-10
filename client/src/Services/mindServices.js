import thaliaAPI from "../API/thaliaAPI";

export const getMind = async () => {
    try {
        const response = await thaliaAPI.get('/admin/my-mind', {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const editMind = async (mindDetails, rightId) => {
    try {
        const response = await thaliaAPI.put(`/admin/my-mind/${rightId}`, mindDetails, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const createMind = async (mindDetails) => {
    try {
        const response = await thaliaAPI.post("/admin/my-mind", mindDetails, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getDelete = async (mindId) => {
    try {
        const response = await thaliaAPI.delete(`/admin/my-mind/${mindId}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}
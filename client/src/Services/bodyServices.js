import thaliaAPI from "../API/thaliaAPI";

export const getTopics = async () => {
    try {
        const response = await thaliaAPI.get("/admin/my-body", { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const addTopic = async (formData) => {
    try {
        const response = await thaliaAPI.post("/admin/my-body", formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteBody = async (bodyId) => {
    try {
        const response = await thaliaAPI.delete(`/admin/my-body/${bodyId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const editBody = async (formData, bodyId) => {
    try {
        const response = await thaliaAPI.put(`/admin/my-body/${bodyId}`, formData);
        return response.data;
    } catch (error) {
        console.log("error=>", error)
        return error;
    }
}
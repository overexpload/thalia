import thaliaAPI from "../API/thaliaAPI";

export const getUsers = async () => {
    try {
        const response = await thaliaAPI.get("/admin/users", { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const blockUser = async (userId) => {
    try {
        const response = await thaliaAPI.put(`/admin/users/block/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const unBlockUser = async (userId) => {
    try {
        const response = await thaliaAPI.put(`/admin/users/unblock/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error;
    }
}


import thaliaAPI from "../API/thaliaAPI";

export const getRecentDiscussions = async (page) => {
    try {
        const response = await thaliaAPI.get(`/community/discussions/recent?page=${page}`);
        return response;
    } catch (error) {
        return error
    }
}

export const getCommunity = async function (communityId) {
    try {
        const response = await thaliaAPI.get(`/community/get-details/${communityId}`);
        return response;
    } catch (error) {
        return error
    }
}
export const likeDiscussion = async function (discussionId) {
    try {
        const response = await thaliaAPI.put(`/community/discussions/like/${discussionId}`);
        return response;
    } catch (error) {
        return error
    }
}
export const dislikeDiscussion = async function (discussionId) {
    try {
        const response = await thaliaAPI.put(`/community/discussions/dislike/${discussionId}`);
        return response;
    } catch (error) {
        return error
    }
}
export const getComments = async (id) => {
    try {
        const response = await thaliaAPI.get(`/community/discussions/comment/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}
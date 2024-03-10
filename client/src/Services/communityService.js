import { createAsyncThunk } from "@reduxjs/toolkit";
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


export const newCommunity = createAsyncThunk(
    "community/newCommunity",
    async (payload, thunkAPI) => {
        try {
            const { data } = await thaliaAPI.post('/community', payload);
            return data;
        } catch (err) {
            const payload = {
                status: err.response.data.status,
                message: err.response.data.message
            }
            return thunkAPI.rejectWithValue(payload)
        }
    })


export const getMyCommunity = createAsyncThunk(
    "community/getMyCommunity",
    async (_, thunkAPI) => {
        try {
            const { data } = await thaliaAPI.get('/community/my-communities');
            return data;
        } catch (err) {
            const payload = {
                status: err.response.data.status,
                message: err.response.data.message
            }
            return thunkAPI.rejectWithValue(payload)
        }
    })
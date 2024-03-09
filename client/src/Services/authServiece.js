import thaliaAPI from "../API/thaliaAPI";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const verifyEmail = async (email) => {
    try {
        const { data } = await thaliaAPI.post("/verify-mail", { email }, { withCredentials: true });
        return data;
    } catch (err) {
        return err;
    }
}

export const verifyOtp = async (email, otp) => {
    try {
        const { data } = await thaliaAPI.post("/verify-otp", { email, otp });
        return data;
    } catch (err) {
        console.log(err);
        const payload = {
            status: err.respones.data.status,
            message: err.respones.data.message
        }
        return payload;
    }
}

export const signUp = createAsyncThunk(
    "auth/signup",
    async (userData, thunkAPI) => {
        try {
            const { data } = await thaliaAPI.post('/signup', userData);
            return data;
        } catch (err) {
            const payload = {
                status: err.response.data.status,
                message: err.response.data.message
            }
            return thunkAPI.rejectWithValue(payload)
        }
    }
)

export const login = createAsyncThunk(
    "auth/signin",
    async (userData, thunkAPI) => {
        try {
            const { data } = await thaliaAPI.post("/signin", userData);
            return data;
        } catch (err) {
            const payload = {
                status: err.response.data.status,
                message: err.response.data.message
            }
            return thunkAPI.rejectWithValue(payload)
        }
    }
)

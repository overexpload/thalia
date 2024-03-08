import thaliaAPI from "../API/thaliaAPI";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const verifyEmail = async (email) => {
    try {
        const { data } = await thaliaAPI.post("/verify_email", { email }, { withCredentials: true });
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

export const verifyOtp = async (formData) => {
    try {
        const { data } = await thaliaAPI.post("/verify_otp", formData, { withCredentials: true });
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
            const { data } = await thaliaAPI.post('/signup', userData, { withCredentials: true });
            return data;
        } catch (err) {
            const payload = {
                status: err.respones.data.status,
                message: err.respones.data.message
            }
            return thunkAPI.rejectWithValue(payload)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const { data } = await thaliaAPI.post("/login", userData, { withCredentials: true });
            return data;
        } catch (err) {
            const payload = {
                status: err.respones.data.status,
                message: err.respones.data.message
            }
            return thunkAPI.rejectWithValue(payload)
        }
    }
)

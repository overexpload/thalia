import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../Services/authServiece";
import Cookies from "js-cookie";

const user = localStorage.getItem("user");
const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: null,
    user: user ? JSON.parse(user) : null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false,
                state.isLoading = false,
                state.isLoading = false,
                state.errorMessage = null
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            Cookies.remove("token");
            window.location.reload();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                Cookies.set("token", action.payload.token, {
                    secure: true,
                    sameSite: "none",
                    path: '/',
                    expires: 3,
                });
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log("action payload", action)
                state.errorMessage = action.payload;
            })
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                Cookies.set("token", action.payload.token, {
                    secure: true,
                    sameSite: "none",
                    path: '/',
                    expires: 3,
                });
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })

    }
});

export const { reset, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import communityReducer from "../features/communitySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        community: communityReducer
    }
})
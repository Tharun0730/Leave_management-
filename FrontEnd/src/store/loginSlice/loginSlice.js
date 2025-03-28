import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

export const loginUser = createAsyncThunk("loginUser", async (userDetails, { rejectWithValue }) => {
    try {
        console.log(userDetails, "userDetails");
        const response = await axiosInstance.post("api/auth/login", userDetails);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState: {
        userDetails: null,
        loginLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loginLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginLoading = false;
                state.userDetails = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginLoading = false;
                state.error = action.payload;
            });
    },
});

export default loginSlice.reducer;

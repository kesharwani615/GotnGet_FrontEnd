/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../Api";
import { Navigate } from 'react-router-dom';


// Fetch all users asynchronously
export const Login_User = createAsyncThunk("/users/login", async (data) => {
    try {
        const response = await api.login(data);
        // console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

export const Logout_User = createAsyncThunk("/users/logout", async () => {
       console.log('called slice')
    try {
        const response = await api.logout();
        console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

export const User_Register = createAsyncThunk("/users/Register", async (data) => {
       console.log('called slice')
    try {
        const response = await api.register(data);
        console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

const user_Auth = createSlice({
    name: 'user',
    initialState: {
        userLogin:[], // Store users in an array
        userLogout:null,
        useRegisterd:null,
        loading: true,
        error: null, // Store any errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Login_User.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(Login_User.fulfilled, (state, action) => {
                state.userLogin = [action.payload?.LoginedUser]; // Update users state
                state.userLogout = null
                localStorage.setItem("accessToken",JSON.stringify(action?.payload?.accessToken))
                localStorage.setItem("LoginedUser",JSON.stringify(action?.payload?.LoginedUser))
                state.loading = false;
                console.log("action payload:", action.payload?.LoginedUser);
                // toast.success("Users fetched successfully");
            })
            .addCase(Login_User.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
            .addCase(User_Register.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(User_Register.fulfilled, (state, action) => {
                state.userLogout = action.payload.message;
                state.loading = false;
                console.log("action payload:", action.payload.message);
                // toast.success("Users fetched successfully");
            })
            .addCase(User_Register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
            .addCase(Logout_User.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(Logout_User.fulfilled, (state, action) => {
                state.userLogout = action.payload.message;
                state.userLogin = [];
                localStorage.clear()
                state.loading = false;
                console.log("action payload:", action.payload.message);
                // toast.success("Users fetched successfully");
            })
            .addCase(Logout_User.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
    }
})


export default user_Auth.reducer;
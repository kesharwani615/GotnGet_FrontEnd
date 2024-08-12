import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../Api";

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

const login = createSlice({
    name: 'user',
    initialState: {
        userLogin:[], // Store users in an array
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
                state.userLogin.push(action?.payload?.LoginedUser); // Update users state
                localStorage.setItem("accessToken",JSON.stringify(action?.payload?.accessToken))
                localStorage.setItem("LoginedUser",JSON.stringify(action?.payload?.LoginedUser))
                state.loading = false;
                // console.log("action payload:", action.payload?.LoginedUser);
                // toast.success("Users fetched successfully");
            })
            .addCase(Login_User.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
    }
})

console.log(login);

export default login.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../Api";

// Fetch all users asynchronously
export const fetchAllUsers = createAsyncThunk("/users/fetchAllUsers", async () => {
    console.log('called slice')
    try {
        const response = await api.getAllUser();
        // console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [], // Store users in an array
        loading: true,
        error: null, // Store any errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users; // Update users state
                state.loading = false;
                // console.log("action payload:", action.payload);
                // toast.success("Users fetched successfully");
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
    }
})

export default userSlice.reducer;

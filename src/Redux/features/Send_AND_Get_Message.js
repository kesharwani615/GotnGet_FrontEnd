import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../Api";

export const SendMessageToUsers = createAsyncThunk("messages/sendSingalUserMsg/", async ({data,id}) => {
    // console.log('called slice:',id)
    try {
        const response = await api.sendMessage({data,id});
        // console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

export const getMessageToUsers = createAsyncThunk("/messages/getSingalUserMsg", async (id) => {
    console.log('called slice:',id)
    try {
        const response = await api.getMessage(id);
        // console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

const Send_Msg = createSlice({
    name: 'user',
    initialState: {
        message_sent:'', // Store users in an array
        userMessage:[], 
        loading: true,
        error: null, // Store any errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SendMessageToUsers.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(SendMessageToUsers.fulfilled, (state, action) => {
                state.message_sent = action.payload; // Update users state
                state.loading = false;
                // console.log("action payload:", action.payload);
                // toast.success("Users fetched successfully");
            })
            .addCase(SendMessageToUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
            .addCase(getMessageToUsers.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(getMessageToUsers.fulfilled, (state, action) => {
                state.userMessage = action.payload?.Allmessage; // Update users state
                state.loading = false;
                // console.log("action payload:", action.payload.Allmessage);
                // toast.success("Users fetched successfully");
            })
            .addCase(getMessageToUsers.rejected, (state, action) => {
                state.userMessage = []
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
    }
})

export default Send_Msg.reducer;

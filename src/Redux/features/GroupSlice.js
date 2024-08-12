import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../Api";

// Fetch all users asynchronously
export const groupCreatorSlice = createAsyncThunk("/group/groupCreator", async ({group,groupMember}) => {
    console.log('called slice:',group,groupMember);
    try {
        const response = await api.CreateGroup({group,groupMember});
        // console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

export const getAllGroups = createAsyncThunk("/group/getAllGroups", async () => {
    console.log('called slice:');
    try {
        const response = await api.getAllGroups();
        // console.log("response", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

export const getGroupMessage = createAsyncThunk("/group/getGroupMsg", async (id) => {
    console.log('called slice:',id);
    try {
        const response = await api.getGroupMessage(id);
        // console.log("response groupMsg:", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

export const SendGroupMessage = createAsyncThunk("/group/sendGroupMsg", async ({data,id}) => {
    console.log('called slice:',data,id);
    try {
        const response = await api.SendGroupMessage({data,id});
        // console.log("response groupMsg:", response);
        return response.data; // Return the response data directly
    } catch (error) {
        console.log("error:", error);
        throw error; // Re-throw error to be caught by rejected case
    }
})

const GroupCreate = createSlice({
    name: 'Group',
    initialState: {
        Group:'',
        AllGroups:[],
        GroupMessage:[],
        sendGroupMessage:'',
        loading: true,
        error: null, // Store any errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(groupCreatorSlice.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(groupCreatorSlice.fulfilled, (state, action) => {
                state.Group = action.payload.message; // Update users state
                state.loading = false;
                // console.log("action payload:", action.payload);
                // toast.success("Users fetched successfully");
            })
            .addCase(groupCreatorSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
            .addCase(getAllGroups.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(getAllGroups.fulfilled, (state, action) => {
                state.AllGroups = action.payload.groups; // Update users state
                state.loading = false;
                // console.log("action payload:", action.payload);
                // toast.success("Users fetched successfully");
            })
            .addCase(getAllGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
            .addCase(getGroupMessage.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(getGroupMessage.fulfilled, (state, action) => {
                state.GroupMessage = action.payload.message; // Update users state
                state.loading = false;
                // console.log("action payload groupMesg:", action.payload);
                // toast.success("Users fetched successfully");
            })
            .addCase(getGroupMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
            .addCase(SendGroupMessage.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(SendGroupMessage.fulfilled, (state, action) => {
                state.sendGroupMessage = action.payload; // Update users state
                state.loading = false;
                // console.log("action payload groupMesg:", action.payload);
                // toast.success("Users fetched successfully");
            })
            .addCase(SendGroupMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
                // toast.error("Error fetching users");
                console.log("Error fetching users");
            })
    }
})

export default GroupCreate.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { WorkspaceMember } from "../../interfaces/workspace";
import {
    getWorkspaceMembersApi,
    addWorkspaceMemberApi,
    removeWorkspaceMemberApi
} from "../../api/workspace";

export interface WorkspaceMemberState {
    members: WorkspaceMember[];
    loading: boolean;
    error: string | null;
}

const initialState: WorkspaceMemberState = {
    members: [],
    loading: false,
    error: null
};

export const fetchMembers = createAsyncThunk(
    "workspaceMembers/getAll",
    async (workspaceId: string, { rejectWithValue }) => {
        try {
            const res = await getWorkspaceMembersApi(workspaceId);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "An unknown error occurred"
            );
        }
    }
);

export const addMember = createAsyncThunk(
    "workspaceMembers/add",
    async (
        data: { workspaceId: string; userId: string; role: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await addWorkspaceMemberApi(data.workspaceId, data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "An unknown error occurred"
            );
        }
    }
);

export const removeMember = createAsyncThunk(
    "workspaceMembers/delete",
    async (
        data: { workspaceId: string; userId: string },
        { rejectWithValue }
    ) => {
        try {
            await removeWorkspaceMemberApi(data.workspaceId, data.userId);
            return data.userId;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "An unknown error occurred"
            );
        }
    }
);

const workspaceMemberSlice = createSlice({
    name: "workspaceMembers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchMembers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addMember.fulfilled, (state, action) => {
                state.members.push(action.payload);
            })

            .addCase(removeMember.fulfilled, (state, action) => {
                state.members = state.members.filter(
                    (m) => m.user?._id !== action.payload
                );
            });
    }
});

export default workspaceMemberSlice.reducer;
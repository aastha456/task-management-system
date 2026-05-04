import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { WorkspaceMember } from "../../interfaces/workspace";
import {
    getWorkspaceMembersApi,
    addWorkspaceMemberApi,
    removeWorkspaceMemberApi
} from "../../api/workspace";

export interface WorkspaceMemberState {
    membersByWorkspace: Record<string, WorkspaceMember[]>;
    loading: boolean;
    error: string | null;
}

const initialState: WorkspaceMemberState = {
    membersByWorkspace: {},
    loading: false,
    error: null
};

export const fetchMembers = createAsyncThunk(
    "workspaceMembers/getAll",
    async (workspaceId: string, { rejectWithValue }) => {
        try {
            const res = await getWorkspaceMembersApi(workspaceId);
            return { workspaceId, data: res.data.data };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Error fetching members"
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
            return { workspaceId: data.workspaceId, member: res.data.data };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Error adding member"
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
            return data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Error removing member"
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
                state.membersByWorkspace[action.payload.workspaceId] =
                    action.payload.data;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // ADD
            .addCase(addMember.fulfilled, (state, action) => {
                const { workspaceId, member } = action.payload;

                if (!state.membersByWorkspace[workspaceId]) {
                    state.membersByWorkspace[workspaceId] = [];
                }

                state.membersByWorkspace[workspaceId].push(member);
            })

            .addCase(removeMember.fulfilled, (state, action) => {
                const { workspaceId, userId } = action.payload;

                if (!state.membersByWorkspace[workspaceId]) return;

                state.membersByWorkspace[workspaceId] =
                    state.membersByWorkspace[workspaceId].filter(
                        (m) => m.user?._id !== userId
                    );
            });
    }
});

export default workspaceMemberSlice.reducer;
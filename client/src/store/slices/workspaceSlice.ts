import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Workspace } from "../../interfaces/workspace";
import {
    getWorkspacesApi,
    createWorkspaceApi,
    deleteWorkspaceApi
} from "../../api/workspace";

export interface WorkspaceState {
    workspaces: Workspace[];
    loading: boolean;
    error: string | null;
}

const initialState: WorkspaceState = {
    workspaces: [],
    loading: false,
    error: null
};

export const fetchWorkspaces = createAsyncThunk(
    "workspaces/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getWorkspacesApi();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const createWorkspace = createAsyncThunk(
    "workspaces/create",
    async (data: Partial<Workspace>, { rejectWithValue }) => {
        try {
            const res = await createWorkspaceApi(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const deleteWorkspace = createAsyncThunk(
    "workspaces/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteWorkspaceApi(id);
            return id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

const workspaceSlice = createSlice({
    name: "workspaces",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkspaces.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                state.loading = false;
                state.workspaces = action.payload;
            })
            .addCase(fetchWorkspaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createWorkspace.fulfilled, (state, action) => {
                state.workspaces.push(action.payload);
            })
            .addCase(deleteWorkspace.fulfilled, (state, action) => {
                state.workspaces = state.workspaces.filter(w => w._id !== action.payload);
            });
    }
});

export default workspaceSlice.reducer;
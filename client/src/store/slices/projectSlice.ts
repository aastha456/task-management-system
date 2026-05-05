import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Project, CreateProjectPayload} from "../../interfaces/project";
import {
    getAllProjectsApi,
    getProjectsApi,
    createProjectApi,
    deleteProjectApi
} from "../../api/project";

export interface ProjectState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null
};

export const fetchProjects = createAsyncThunk(
    "projects/getAll",
    async (workspaceId: string, { rejectWithValue }) => {
        try {
            const res = await getProjectsApi(workspaceId);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed");
        }
    }
);

export const fetchAllProjects = createAsyncThunk(
    "projects/getAllAdmin",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllProjectsApi();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed");
        }
    }
);

export const createProject = createAsyncThunk<
    Project,                 
    CreateProjectPayload,    
    { rejectValue: string }
>(
    "projects/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createProjectApi(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const deleteProject = createAsyncThunk(
    "projects/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteProjectApi(id);
            return id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.projects = [];
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllProjects.pending, (state) => { 
                state.loading = true; 
            })
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter(p => p._id !== action.payload);
            });
    }
});

export default projectSlice.reducer;
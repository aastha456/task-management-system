import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "../../interfaces/task";
import {
    getTasksApi,
    createTaskApi,
    updateTaskApi,
    deleteTaskApi
} from "../../api/task";

export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
};

export const fetchTasks = createAsyncThunk(
    "tasks/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getTasksApi();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const createTask = createAsyncThunk(
    "tasks/create",
    async (data: Partial<Task>, { rejectWithValue }) => {
        try {
            const res = await createTaskApi(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/update",
    async ({ id, data }: { id: string; data: Partial<Task> }, { rejectWithValue }) => {
        try {
            const res = await updateTaskApi(id, data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteTaskApi(id);
            return id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const i = state.tasks.findIndex(t => t._id === action.payload._id);
                if (i !== -1) state.tasks[i] = action.payload;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t._id !== action.payload);
            });
    }
});

export default taskSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../interfaces/user";
import { getUsersApi, deleteUserApi } from "../../api/user";

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const fetchUsers = createAsyncThunk(
    "users/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getUsersApi();
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteUserApi(id);
            return id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u._id !== action.payload);
            });
    }
});

export default userSlice.reducer;
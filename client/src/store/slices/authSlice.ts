import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    clearTokens,
    getDecodedToken
} from "../../utils/token";

import { login, register, logout } from "../../api/auth";
import type { LoginForm } from "../../pages/auth/Login";
import type { RegisterForm } from "../../pages/auth/Register";

export interface AuthState {
    userId: string | null;
    role: string | null;
    name: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

const parseUserFromToken = (token: string | null) => {
    if (!token) return { userId: null, role: null, name: null };

    try {
        const decoded = getDecodedToken(token);
        return {
            userId: decoded.userId,
            role: decoded.role || "user",
            name: decoded.name || null
        };
    } catch {
        return { userId: null, role: null, name: null };
    }
};

const accessToken = getAccessToken();
const refreshToken = getRefreshToken();

const { userId, role, name } = parseUserFromToken(accessToken);

const initialState: AuthState = {
    userId,
    role,
    name,
    accessToken,
    refreshToken,
    loading: false,
    isAuthenticated: !!accessToken,
    error: null
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data: LoginForm, { rejectWithValue }) => {
        try {
            const res = await login(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: RegisterForm, { rejectWithValue }) => {
        try {
            await register(data);
            return true;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Register failed");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                await logout({ refreshToken });
            }
            return true;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Logout failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { accessToken, refreshToken } = action.payload;

                setAccessToken(accessToken);
                setRefreshToken(refreshToken);

                const { userId, role, name } = parseUserFromToken(accessToken);

                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.userId = userId;
                state.role = role;
                state.name = name;
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = false;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                clearTokens();
                state.accessToken = null;
                state.refreshToken = null;
                state.userId = null;
                state.role = null;
                state.isAuthenticated = false;
            });
    }
});

export default authSlice.reducer;
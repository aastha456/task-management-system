import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import workspaceReducer from "./slices/workspaceSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        workspaces: workspaceReducer,
        projects: projectReducer,
        tasks: taskReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
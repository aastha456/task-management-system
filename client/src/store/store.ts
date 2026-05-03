import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import workspaceReducer from "./slices/workspaceSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import workspaceMemberReducer from "./slices/workspaceMemberSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        workspaces: workspaceReducer,
        projects: projectReducer,
        tasks: taskReducer,
        members: workspaceMemberReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
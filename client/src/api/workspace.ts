import http from "../utils/http";
import type { Workspace } from "../interfaces/workspace";

export const getWorkspacesApi = async () => {
    return http.get("/workspaces");
};

export const createWorkspaceApi = async (data: Partial<Workspace>) => {
    return http.post("/workspaces", data);
};

export const deleteWorkspaceApi = async (id: string) => {
    return http.delete(`/workspaces/${id}`);
};

export const getWorkspaceMembersApi = async (workspaceId: string) => {
    return http.get(`/workspaces/${workspaceId}/members`);
};

export const addWorkspaceMemberApi = async (
    workspaceId: string,
    data: { userId: string; role: string }
) => {
    return http.post(`/workspaces/${workspaceId}/members`, data);
};

export const removeWorkspaceMemberApi = async (
    workspaceId: string,
    userId: string
) => {
    return http.delete(`/workspaces/${workspaceId}/members`, {
        data: { userId }
    });
};
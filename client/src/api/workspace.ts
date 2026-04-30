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
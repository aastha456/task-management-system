import http from "../utils/http";
import type { Project } from "../interfaces/project";

export const getProjectsApi = async (workspaceId: string) => {
    return http.get(`/projects?workspaceId=${workspaceId}`);
};

export const createProjectApi = async (data: Partial<Project>) => {
    return http.post("/projects", data);
};

export const deleteProjectApi = async (id: string) => {
    return http.delete(`/projects/${id}`);
};
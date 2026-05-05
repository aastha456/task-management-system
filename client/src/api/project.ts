import http from "../utils/http";
import type { CreateProjectPayload } from "../interfaces/project";

export const getAllProjectsApi = async () => {
    return http.get("/projects/");
};

export const getProjectsApi = async (workspaceId: string) => {
    return http.get(`/projects?workspaceId=${workspaceId}`);
};

export const createProjectApi = async (data: CreateProjectPayload) => {
    return http.post("/projects", data);
};

export const deleteProjectApi = async (id: string) => {
    return http.delete(`/projects/${id}`);
};
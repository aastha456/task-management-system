
import http from "../utils/http";
import  type { Task }  from "../interfaces/task";

export const getTasksApi = async () => {
    return http.get("/tasks");
};

export const createTaskApi = async (data: Partial<Task>) => {
    return http.post("/tasks", data);
};

export const updateTaskApi = async (id: string, data: Partial<Task>) => {
    return http.put(`/tasks/${id}`, data);
};

export const deleteTaskApi = async (id: string) => {
    return http.delete(`/tasks/${id}`);
};
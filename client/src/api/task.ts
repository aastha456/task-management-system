
import http from "../utils/http";
import  type { Task, TaskForm }  from "../interfaces/task";

export const getTasksApi = async () => {
    return http.get("/tasks");
};

export const createTaskApi = async (data: TaskForm) => {
   const formData = new FormData();
    
    // Append all text fields to FormData
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && key !== 'file') {
            formData.append(key, value as string);
        }
    });

    // Append the file if it exists
    if (data.file) {
        formData.append("file", data.file);
    }

    return http.post("/tasks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateTaskApi = async (id: string, data: Partial<Task>) => {
    return http.put(`/tasks/${id}`, data);
};

export const deleteTaskApi = async (id: string) => {
    return http.delete(`/tasks/${id}`);
};
import http from "../utils/http";

export const getUsersApi = async () => {
    return http.get("/users");
};

export const deleteUserApi = async (id: string) => {
    return http.delete(`/users/${id}`);
};
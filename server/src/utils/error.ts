import { NotFound } from "../interfaces/error";

export const NotFoundError = (message?: string): NotFound => {
    return {
        message: message || "Item not found",
        status: 404
    }
}

export const ForbiddenError = (message?: string) => {
    return {
        message: message || "Forbidden",
        status: 403
    }
}
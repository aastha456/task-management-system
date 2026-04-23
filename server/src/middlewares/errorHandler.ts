import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {status, message} = error;
    res.status(status || 500).json({
        message: message || "Internal server error"
    })
}
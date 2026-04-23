import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from "../config";
import { errorResponse } from "../utils/responseHelper";
import { AuthenticatedUser } from './../interfaces/user';


export interface UserRequest extends Request {
    user?: any
}

export const authenticate = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return errorResponse(res, {
            message: "Authentication token missing"})
        }
    try {
        req.user = jwt.verify(token, config.JWT_SECRET) as AuthenticatedUser;
        next();

    } catch(error){
        return errorResponse(res, { message: "Invalid or expired token" });

    }
    

}

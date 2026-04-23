import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userServices";
import { successResponse } from "../utils/responseHelper";

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const response = await userService.getAll();
        console.log(response)
        return successResponse(res, { data: response})

    } catch(error){
        next(error)
    }
}
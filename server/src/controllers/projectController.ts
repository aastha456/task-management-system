import { Response, NextFunction } from 'express';
import * as projectService from "../services/projectServices";
import { successResponse } from '../utils/responseHelper';
import { UserRequest } from '../middlewares/authenticate';

export const createProject = async (
    req: UserRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const response = await projectService.createProject(req.body, req.user.userId);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const getAllProject = async (
    req: UserRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        // workspace id is required to fetch projects, it will be passed as query parameter
        const workspaceId = String(req.query.workspaceId);
        const response = await projectService.getAllProject(workspaceId, req.user.userId);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const getProjectById = async (
    req: UserRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const response = await projectService.getProjectById(String(req.params.id), req.user.userId);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const updateProject = async (
    req: UserRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const response = await projectService.updateProject(
            String(req.params.id),
            req.body,
            req.user.userId
        );
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const deleteProject = async (
    req: UserRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const response = await projectService.deleteProject(
            String(req.params.id),
            req.user.userId
        );
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};



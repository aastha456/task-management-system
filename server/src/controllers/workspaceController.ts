import { Response, NextFunction } from "express";
import * as workspaceService from "../services/workspaceServices";
import { successResponse } from "../utils/responseHelper";
import { UserRequest } from "../middlewares/authenticate";


export const createWorkspace = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.createWorkspace(req.body, req.user.userId);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const getAllWorkspaces = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.getAllWorkspaces(req.user.userId, req.user.role);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const getWorkspaceById = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.getWorkspaceById(String(req.params.id), req.user.userId);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const updateWorkspace = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.updateWorkspace(String(req.params.id), req.body, req.user.userId);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const deleteWorkspace = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.deleteWorkspace(String(req.params.id), req.user.userId, req.user.role);
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const getMembers = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.getMembers(
            String(req.params.id)
        )


        return successResponse(res, { data: response });
    } catch (error) {
        next(error);
    }
};

export const addMember = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.addMember(
            String(req.params.id),
            req.body.userId,
            req.user.userId,
            req.user.role,
            req.body.role || "member"
        );
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};

export const removeMember = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const response = await workspaceService.removeMember(
            String(req.params.id),
            req.body.userId,
            req.user.userId,
            req.user.role
        );
        return successResponse(res, { data: response });
    } catch (error) { next(error); }
};
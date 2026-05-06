import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskServices";
import { successResponse } from "../utils/responseHelper";
import { UserRequest } from "../middlewares/authenticate";
import { uploadToCloudinary } from "../services/cloudinaryServices";

export const createTask = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let attachmentUrl;
    if(req.file){
      try{
        const result: any = await uploadToCloudinary(req.file.buffer);
        attachmentUrl = result.secure_url;

      } catch(error){
         console.log("CLOUDINARY ERROR:", error);
        throw error;
      }
         
    }

    const response = await taskService.createTask(
      { ...req.body, attachment: attachmentUrl },
      req.user.userId,
      req.user.role
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await taskService.getAllTasks(
      req.user.userId,
      req.user.role
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await taskService.getTaskById(String(req.params.id), req.user.userId, req.user.role);
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await taskService.updateTask(
      String(req.params.id),
      req.body,
      req.user.userId,
      req.user.role
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await taskService.deleteTask(
      String(req.params.id),
      req.user
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};
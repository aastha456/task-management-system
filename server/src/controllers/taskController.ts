import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskServices";
import { successResponse } from "../utils/responseHelper";
import { UserRequest } from "../middlewares/authenticate";

export const createTask = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await taskService.createTask(
      req.body,
      req.user.userId
    );
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await taskService.getAllTasks();
    return successResponse(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await taskService.getTaskById(String(req.params.id));
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
      req.user.userId
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
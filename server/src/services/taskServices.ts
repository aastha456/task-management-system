import TaskModel from "../models/TaskModel";
import WorkspaceMemberModel from "../models/WorkspaceMemberModel";
import { Types } from "mongoose";

export const createTask = async (data: any, userId: string, role: string) => {
 if (!data.title || !data.workspaceId) {
        throw new Error("Title and Workspace are required");
    }

    const workspaceId = new Types.ObjectId(data.workspaceId);
    const creatorId = new Types.ObjectId(userId);

    if (role !== "admin") {
        const isMember = await WorkspaceMemberModel.findOne({
            workspace: workspaceId,
            user: creatorId
        });
        
        if (!isMember) {
            throw new Error("Unauthorized: You must be a member of this workspace to create tasks");
        }
    }

    const taskData: any = {
        title: data.title,
        description: data.description,
        priority: data.priority || 'medium',
        status: data.status || 'todo',
        workspaceId: workspaceId,
        createdBy: creatorId,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined
    };

    if (data.projectId && Types.ObjectId.isValid(data.projectId)) {
        taskData.projectId = new Types.ObjectId(data.projectId);
    }

    if (data.assignedTo && Types.ObjectId.isValid(data.assignedTo)) {
        taskData.assignedTo = new Types.ObjectId(data.assignedTo);
        
        if (role !== "admin") {
            const assignedMember = await WorkspaceMemberModel.findOne({
                workspace: workspaceId,
                user: taskData.assignedTo
            });
            if (!assignedMember) {
                throw new Error("Cannot assign: User is not a member of this workspace");
            }
        }
    }

    return await TaskModel.create(taskData);

}

export const getAllTasks = async (userId: string, role: string) => {
    if (role === "admin") {
        return await TaskModel.find()
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");
    }

    return await TaskModel.find({
        $or: [
            { assignedTo: userId },
            { createdBy: userId }
        ]
    })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");
    

}

export const getTaskById = async (id: string, userId: string, role: string) => {
    const task = await TaskModel.findById(id)
     .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

    if(!task){
        throw new Error("Task not found");
    }
    if(role !== "admin"){
        const isOwner =
            task.createdBy.toString() === userId;

        const isAssigned =
            task.assignedTo?.toString() === userId;

        if (!isOwner && !isAssigned) {
            throw new Error("Unauthorized");
        }
    }

    return task;

}

export const updateTask = async (id: string, data: any, userId: string, role: string) => {
    const task = await TaskModel.findById(id);
    if (!task) throw new Error("Task not found");

    const isOwner = task.createdBy.toString() === userId;
    const isAssigned = task.assignedTo?.toString() === userId;

    if (role === "admin") {
        return await TaskModel.findByIdAndUpdate(id, data, { new: true });
    }

    if (isOwner) {
        return await TaskModel.findByIdAndUpdate(id, data, { new: true });
    }

    if (isAssigned && data.status) {
        return await TaskModel.findByIdAndUpdate(
            id,
            { status: data.status },
            { new: true }
        );
    }

    throw new Error("Unauthorized");

}

export const deleteTask = async (id: string, user: any) => {

   const task = await TaskModel.findById(id);
    if (!task) throw new Error("Task not found");

    const isOwner = task.createdBy.toString() === user.userId;

    if (user.role !== "admin" && !isOwner) {
        throw new Error("Unauthorized");
    }

    return await TaskModel.findByIdAndDelete(id);
}
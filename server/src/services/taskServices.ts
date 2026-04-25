import TaskModel from "../models/TaskModel";

export const createTask = async (data: any, userId: string) => {
    return await TaskModel.create({ ...data, createdBy: userId });

}

export const getAllTasks = async () => {
    return await TaskModel.find().populate("assignedTo createdBy");

}

export const getTaskById = async (id: string) => {
    const task = await TaskModel.findById(id);
    if(!task){
        throw new Error("Task not found");
    }

    return task;

}

export const updateTask = async (id: string, data: any, userId: any) => {
    const task = await TaskModel.findById(id);
    if(!task){
        throw new Error("Task not found");
    }

    if(task.createdBy.toString() !== userId ){
        throw new Error("Unauthorized");
    }

    return await TaskModel.findByIdAndUpdate(id, data, { new: true });

}

export const deleteTask = async (id: string, user: any) => {
    const task = await TaskModel.findById(id);
    if(!task){
        throw new Error("Task not found");
    }

    if(task.createdBy.toString() !== user.userId && user.role !== "admin"){
        throw new Error("Unauthorized");
    }

    return await TaskModel.findByIdAndDelete(id);
}
import ProjectModel from "../models/ProjectModel";
import WorkspaceMemberModel from "../models/WorkspaceMemberModel";
import { Types } from "mongoose";

const checkWorkspaceMember = async (workspaceId: string, userId: string) => {

    if (!workspaceId || !Types.ObjectId.isValid(workspaceId)) {
        throw new Error('Invalid Workspace ID format');
    }

    const isMember = await WorkspaceMemberModel.findOne({
        workspace: new Types.ObjectId(workspaceId),
        user: new Types.ObjectId(userId)
    });

    if(!isMember) {
        throw new Error('Unauthorized - not a member of the workspace');
    }

    return isMember;
}

export const createProject = async (data:any, userId: string) => {
    await checkWorkspaceMember(data.workspace, userId);
    const project = await ProjectModel.create({ ...data, createdBy: userId });
    return project;
}

export const getAllProjects = async (workspaceId: string, userId: string, role: string) => {
    if (role === "admin") {
        const filter = workspaceId === "all" ? {} : { workspace: workspaceId };
        
        return await ProjectModel.find(filter)
            .populate('createdBy', 'name email')
            .populate('workspace', 'name'); 
    }
    await checkWorkspaceMember(workspaceId, userId);
    return await ProjectModel.find({ workspace: workspaceId })
        .populate('createdBy', 'name email');
}

export const getProjectById = async (id: string, userId: string, role: string) => {
    const project = await ProjectModel.findById(id);
    if(!project){
        throw new Error("Project not found");
    }
    if(role !== "admin") {
        await checkWorkspaceMember(project.workspace.toString(), userId);
    }
    await checkWorkspaceMember(project.workspace.toString(), userId);
    return project;
}

export const updateProject = async (id: string, data: any, userId: string, role: string) => {
    const project = await ProjectModel.findById(id);
    if(!project){
        throw new Error("Project not found");
    }

    if(role !== "admin" && project.createdBy.toString() !== userId) {
        throw new Error("Unauthorized");
    }
    return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
}

export const deleteProject = async (id: string, userId: string, role: string) => {
    const project = await ProjectModel.findById(id);
    if(!project){
        throw new Error("Project not found");
    }   

    if(role !== "admin" && project.createdBy.toString() !== userId) {
        throw new Error("Unauthorized - only creator can delete the project");
    }   
    await ProjectModel.findByIdAndDelete(id);
}   


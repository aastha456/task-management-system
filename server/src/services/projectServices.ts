import ProjectModel from "../models/ProjectModel";
import WorkspaceMemberModel from "../models/WorkspaceMemberModel";

const checkWorkspaceMember = async (workspaceId: string, userId: string) => {
    const isMember = await WorkspaceMemberModel.findOne({
        workspace: workspaceId,
        user: userId
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

export const getAllProject = async (workspaceId: string, userId: string) => {
    await checkWorkspaceMember(workspaceId, userId);
    return await ProjectModel.find({ workspace: workspaceId }).populate('createdBy', 'name email');
}

export const getProjectById = async (id: string, userId: string) => {
    const project = await ProjectModel.findById(id);
    if(!project){
        throw new Error("Project not found");
    }
    await checkWorkspaceMember(project.workspace.toString(), userId);
    return project;
}

export const updateProject = async (id: string, data: any, userId: string) => {
    const project = await ProjectModel.findById(id);
    if(!project){
        throw new Error("Project not found");
    }

    if(project.createdBy.toString() !== userId) {
        throw new Error("Unauthorized - only creator can update the project");
    }
    return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
}

export const deleteProject = async (id: string, userId: string) => {
    const project = await ProjectModel.findById(id);
    if(!project){
        throw new Error("Project not found");
    }   

    if(project.createdBy.toString() !== userId) {
        throw new Error("Unauthorized - only creator can delete the project");
    }   
    await ProjectModel.findByIdAndDelete(id);
}   


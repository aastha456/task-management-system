import WorkspaceModel from "../models/WorkspaceModel";
import WorkspaceMemberModel from "../models/WorkspaceMemberModel";

export const createWorkspace = async (data: any, userId: string) => {
    const workspace = await WorkspaceModel.create({ ...data, owner: userId });
    await WorkspaceMemberModel.create({
        workspace: workspace._id,
        user: userId,
        role: 'owner'
    });

    return workspace;
};

export const getAllWorkspaces = async (userId: string) => {
    const memberships = await WorkspaceMemberModel.find({ user: userId }).populate('workspace');
    return memberships.map(membership => membership.workspace);
};


export const getWorkspaceById = async (id: string, userId: string) => {
    const workspace= await WorkspaceMemberModel.findOne({ workspace: id, user: userId }).populate('workspace');
    if (!workspace) {
        throw new Error('Workspace not found or access denied');
    }

    const isMember = await WorkspaceMemberModel.findOne({
        workspace: id,
        user: userId

    })
    if(!isMember) {
        throw new Error('Access denied');
    }
    return workspace;
}   


export const updateWorkspace = async (id: string, data: any, userId: string) => {
    const workspace = await WorkspaceModel.findById(id);
    if (!workspace) throw new Error("Workspace not found");

    // only owner is able to update
    if (workspace.owner.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    return await WorkspaceModel.findByIdAndUpdate(id, data, { new: true });
};


export const deleteWorkspace = async (id: string, userId: string) => {
    const workspace = await WorkspaceModel.findById(id);
    if (!workspace) throw new Error("Workspace not found");

    // owner matra delete garna sakcha
    if (workspace.owner.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    // members pani delete gara
    await WorkspaceMemberModel.deleteMany({ workspace: id });
    return await WorkspaceModel.findByIdAndDelete(id);
};

export const addMember = async (workspaceId: string, userId: string, requesterId: string) => {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) throw new Error("Workspace not found");

    // owner matra member add garna sakcha
    if (workspace.owner.toString() !== requesterId) {
        throw new Error("Unauthorized");
    }

    // already member chha ki check
    const existing = await WorkspaceMemberModel.findOne({
        workspace: workspaceId,
        user: userId
    });
    if (existing) throw new Error("User is already a member");

    return await WorkspaceMemberModel.create({
        workspace: workspaceId,
        user: userId,
        role: 'member'
    });
};

export const removeMember = async (workspaceId: string, userId: string, requesterId: string) => {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) throw new Error("Workspace not found");

    if (workspace.owner.toString() !== requesterId) {
        throw new Error("Unauthorized");
    }

    return await WorkspaceMemberModel.findOneAndDelete({
        workspace: workspaceId,
        user: userId
    });
};
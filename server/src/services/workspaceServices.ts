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

export const getAllWorkspaces = async (userId: string, userRole: string) => {

    if(userRole === "admin"){
        return await WorkspaceModel.find();
    }
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


export const deleteWorkspace = async (id: string, userId: string, userRole: string) => {
    const workspace = await WorkspaceModel.findById(id);
    if (!workspace) throw new Error("Workspace not found");

    // only owner and admin is able to delete
    const isOwner = workspace.owner.toString() === userId;
    const isAdmin = userRole === "admin";
    if (!isOwner && !isAdmin) {
        throw new Error("Unauthorized");
    }

    // delete members
    await WorkspaceMemberModel.deleteMany({ workspace: id });
    return await WorkspaceModel.findByIdAndDelete(id);
};

export const getMembers = async (workspaceId: string) => {
     return await WorkspaceMemberModel.find({ workspace: workspaceId })
        .populate("user", "name email")
        .lean();
};

export const addMember = async (workspaceId: string, userId: string, requesterId: string, requesterRole: string, role: string = "member") => {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) throw new Error("Workspace not found");

     
    // owner and admin can add members
    const isOwner = workspace.owner.toString() === requesterId;
    const isAdmin = requesterRole === "admin";
    if (!isOwner && !isAdmin) {
        throw new Error("Unauthorized");
    }

    const allowedRoles = ["member", "admin"];
    if(!allowedRoles.includes(role)){
        throw new Error("Cannot assign owner role")
    }

    if(role === "owner"){
        throw new Error("Cannot assign owner role")

    }

    // check if the user is already a member
    const existing = await WorkspaceMemberModel.findOne({
        workspace: workspaceId,
        user: userId
    });
    if (existing) throw new Error("User is already a member");

    const member = await WorkspaceMemberModel.create({
        workspace: workspaceId,
        user: userId,
        role: role
    });

    return await member.populate("user", "name email");

};

export const removeMember = async (workspaceId: string, userId: string, requesterId: string, requesterRole: string) => {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) throw new Error("Workspace not found");

    const isOwner = workspace.owner.toString() === requesterId;
    const isAdmin = requesterRole === "admin";
    if (!isOwner && !isAdmin) {
        throw new Error("Unauthorized");
    }

    return await WorkspaceMemberModel.findOneAndDelete({
        workspace: workspaceId,
        user: userId
    });
};
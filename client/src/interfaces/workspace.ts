export interface Workspace {
    _id: string;
    name: string;
    description?: string;
    owner: string;
    isPrivate: boolean;
}

export interface WorkspaceMember {
    _id: string;
    role: "owner" | "admin" | "member";
    user: {
        _id: string;
        name: string;
        email: string;
    };
}
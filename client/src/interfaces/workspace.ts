export interface Workspace {
    _id: string;
    name: string;
    description?: string;
    owner: string;
    isPrivate: boolean;
}
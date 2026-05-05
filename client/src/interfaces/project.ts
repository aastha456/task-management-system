export interface Project {
    _id: string;
    name: string;
    description?: string;
    workspace: {
        _id: string;
        name: string;
    };
    createdBy: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
}

export type CreateProjectPayload = {
  name: string;
  description?: string;
  workspace: string;
};

// export interface Task {
//     _id: string;
//     title: string;
//     description?: string;
//     status: "todo" | "in-progress" | "done";
//     priority: "low" | "medium" | "high";
//     dueDate?: string;
//     assignedTo?: string;
//     createdBy: string;
//     projectId?: string;
//     workspaceId: string;
    
// }

// // export type TaskForm = Omit<Task, "_id" | "createdBy">;

// export interface TaskForm {
//     title: string;
//     description?: string;
//     priority: "low" | "medium" | "high";
//     status: "todo" | "in-progress" | "done";
//     dueDate?: string;
//     workspaceId: string;    // ✅ required
//     projectId?: string;     // ✅ optional
//     assignedTo?: string;    // ✅ optional
// }

export interface UserLite {
    _id: string;
    name: string;
    email?: string;
}

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate?: string;

   assignedTo?: UserLite | string;
   createdBy?: UserLite | string;

    projectId?: string;
    workspaceId: string;
}

export interface TaskForm {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "done";
    dueDate?: string;
    workspaceId: string;
    projectId?: string;
    assignedTo?: string;
}
import { Schema, Document, model, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo?: Types.ObjectId; // Reference to User
  projectId: Types.ObjectId; // Reference to Project
  workspaceId: Types.ObjectId; // Reference to Workspace
  createdBy: Types.ObjectId; // Reference to User
}

const TaskSchema: Schema = new Schema<ITask>(
    {   
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String 
        },
        status: { 
            type: String, 
            enum: ['todo', 'in-progress', 'done'],
            default: 'todo' 
        },
        priority: { 
            type: String, 
            enum: ['low', 'medium', 'high'],
            default: 'medium' 
        },
        dueDate: { 
            type: Date 
        },
        assignedTo: { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        },
        projectId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Project', 
            required: false
        },
        workspaceId: {
            type: Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true
        },
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
    },
    { 
        timestamps: true 
    }
);

export const TaskModel = model<ITask>('Task', TaskSchema);
export default TaskModel;

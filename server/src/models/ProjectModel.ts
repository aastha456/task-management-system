import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
    name: string;
    description?: string;
    workspace: Types.ObjectId;
    createdBy: Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>(
    {
        name: { 
            type: String, 
            required: true
        },
        description: { 
            type: String 
        },
        workspace: { 
            type: Schema.Types.ObjectId, 
            ref: 'Workspace', 
            required: true
        },
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }
    },
    { 
        timestamps: true 
    }
);

export const ProjectModel = model<IProject>('Project', ProjectSchema);
export default ProjectModel;
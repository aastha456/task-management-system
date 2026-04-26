import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkspaceMember extends Document {
    workspace: Types.ObjectId;
    user: Types.ObjectId;
    role: 'owner' | 'admin' | 'member';
}

const WorkspaceMemberSchema = new Schema<IWorkspaceMember>(
    {
        workspace: { 
            type: Schema.Types.ObjectId, 
            ref: 'Workspace', 
            required: true 
        },
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        role: { 
            type: String, 
            enum: ['owner', 'admin', 'member'],
            default: 'member' 
        }
    },
    { 
        timestamps: true
   }
);

export const WorkspaceMemberModel = model<IWorkspaceMember>('WorkspaceMember', WorkspaceMemberSchema);
export default WorkspaceMemberModel;
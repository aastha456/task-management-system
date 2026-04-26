import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkspace extends Document {
  name: string;
  description?: string;
  owner: Types.ObjectId;
  isPrivate: boolean;
}


const WorkspaceSchema = new Schema<IWorkspace>(
  {
    name: { 
        type: String, 
        required: true 
    },     
    description: { 
        type: String 
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    isPrivate: { 
        type: Boolean, 
        default: false 
    }
  },
  { 
    timestamps: true 
}
);

const Workspace = model<IWorkspace>('Workspace', WorkspaceSchema);
export default Workspace;
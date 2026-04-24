import { Schema, model, Document, Types } from "mongoose";

export interface ISession extends Document {
    userId: Types.ObjectId;
    refreshToken: string;
    expiresAt: Date;
}

const sessionSchema = new Schema<ISession>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    refreshToken: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

const SessionModel = model<ISession>("Session", sessionSchema);

export default SessionModel;
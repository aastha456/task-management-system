import { Schema, model, Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", userSchema);
export default UserModel;
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    newNotification: string[];
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    newNotification: { type: Array, required: true }

})

export const userModel = mongoose.model<IUser>("Users", userSchema);
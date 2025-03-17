import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
    profilePicture: {cloudinaryUrl: string, cloudinaryPublicId:string };
    newNotification: string[];
    upvotedPosts: Schema.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: Object },
    newNotification: { type: Array, required: true },
    upvotedPosts: { type: Array, ref: "Posts", required: true }
})

export const userModel = mongoose.model<IUser>("Users", userSchema);
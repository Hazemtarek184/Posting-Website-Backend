import mongoose, { Schema, Document } from "mongoose";

interface IPosts extends Document {
    title: string;
    content: string;
    userId: mongoose.Types.ObjectId;
    upVotes: number;
}

const postsSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    upVotes: { type: Number, default: 0, required: true }
})

export const postModel = mongoose.model<IPosts>("Posts", postsSchema);
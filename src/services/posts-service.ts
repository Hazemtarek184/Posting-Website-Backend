import { postModel } from '../models/posts-model';
import { userModel } from '../models/users-model';
import { Schema } from "mongoose";

interface IPostElements {
    title: string;
    content: string;
    username: string;
}

export const addPost = async ({ title, content, username }: IPostElements) => {
    try {
        const userId = await userModel.findOne({ username });

        if (!userId) {
            return { statusCode: 404, statusMessage: "No User Found", data: "" };
        }

        const found = await postModel.findOne({ title, content, userId: userId._id });

        if (found) {
            return { statusCode: 409, statusMessage: "Already Posted", data: "" };
        }

        const newPost = { title, content, userId: userId._id, username };

        const post = await postModel.create(newPost);
        post.save();
        return { statusCode: 201, statusMessage: "Post Added", data: "" };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error", data: "" };
    }
}

export const deletePost = async () => {

}

export const getAllPostsByUser = async (username: string) => {
    try {
        const found = await postModel.find({ username }).select('-__v');
        return { statusCode: 200, statusMessage: "", data: found };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error", data: "" };
    }
}

export const getAllPosts = async () => {
    try {
        const found = await postModel.find({}).select('-__v');
        return { statusCode: 200, statusMessage: "", data: found };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error", data: "" };
    }
}

export const upVote = async (id: Schema.Types.ObjectId) => {
    try {
        const found = await postModel.findOneAndUpdate(
            { _id: id },
            { $inc: { upVotes: 1 } },
            { new: true }
        );

        if (!found) {
            return { statusCode: 404, statusMessage: "No Post Found", data: "" };
        }

        const user = await userModel.findById(found.userId);

        if (!user)
            return { statusCode: 404, statusMessage: "No Post Found", data: "" };

        console.log(user);
        user.newNotification.push(found.title);
        user.save();

        return { statusCode: 200, statusMessage: "", data: found };

    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error", data: "" };
    }
}
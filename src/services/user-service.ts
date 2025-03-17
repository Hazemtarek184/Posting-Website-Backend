import { userModel } from "../models/users-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../index";

const fs = require("fs");

interface IRegisterFormat {
    username: string;
    password: string;
    fileData?: {
        buffer: Buffer;
        mimetype: string;
    } | null;
}

interface ILoginFormat {
    username: string;
    password: string;
}

const webToken = (data: any) => {
    return jwt.sign(data, secretKey || (() => { throw new Error("JWT_SECRET_KEY not defined") })());
}

require('dotenv').config()
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const register = async ({ username, password, fileData }: IRegisterFormat) => {
    try {
        const found = await userModel.findOne({ username });
        if (found)
            return { statusCode: 409, statusMessage: "User Already Exists" };

        let cloudinaryUrl = '';
        let cloudinaryPublicId = '';

        const hashedPassword = await bcrypt.hash(password, 10);

        if (fileData) {
            const dataUri = `data:${fileData.mimetype};base64,${fileData.buffer.toString('base64')}`;

            const result = await cloudinary.uploader.upload(dataUri);
            cloudinaryUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
        }

        const newUser = { username: username, password: hashedPassword, profilePicture: { cloudinaryUrl: cloudinaryUrl, cloudinaryPublicId: cloudinaryPublicId }, newNotification: [], upvotedPosts: [] };
        const user = await userModel.create(newUser);
        return { statusCode: 201, statusMessage: "User Created Successfully", data: webToken(username + user._id) };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error" };
    }
}

export const login = async ({ username, password }: ILoginFormat) => {
    try {
        const found = await userModel.findOne({ username });
        if (found) {
            const correctPassword = await bcrypt.compare(password, found.password);
            if (correctPassword) {
                return { statusCode: 200, statusMessage: "User Logged In", data: webToken(username + found._id) };
            } else {
                return { statusCode: 401, statusMessage: "Wrong Password" };
            }
        }
        return { statusCode: 401, statusMessage: "Wrong Username" };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error" };
    }
}

export const getUserProfilePhoto = async (username: String) => {
    try {
        const findUser = await userModel.findOne(username);

        if (!findUser)
            return { statusCode: 401, statusMessage: "User or Image Not Found" };

        return { statusCode: 200, statusMessage: "", data: findUser.profilePicture.cloudinaryUrl };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error" };
    }
}

export const updateProfilePhoto = async () => {

}
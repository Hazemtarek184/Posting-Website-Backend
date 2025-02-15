import { userModel } from "../models/users-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../index";

interface IRegisterAndLoginFormat {
    username: string;
    password: string;
}

const webToken = (data: any) => {
    return jwt.sign(data, secretKey);
}

export const register = async ({ username, password }: IRegisterAndLoginFormat) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const found = await userModel.findOne({ username });

        if (found)
            return { statusCode: 409, statusMessage: "User Already Exists" };


        const newUser = { username: username, password: hashedPassword, newNotification: [] };
        const user = await userModel.create(newUser);
        user.save();
        return { statusCode: 201, statusMessage: "User Created Successfully", data: webToken(username + hashedPassword) };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500, statusMessage: "Server error" };

    }
}

export const login = async ({ username, password }: IRegisterAndLoginFormat) => {
    try {
        const found = await userModel.findOne({ username });
        if (found) {
            const correctPassword = await bcrypt.compare(password, found.password);
            if (correctPassword) {
                return { statusCode: 200, statusMessage: "User Logged In", data: webToken(username + found.password) };
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
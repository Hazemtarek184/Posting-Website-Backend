import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "..";
import { userModel } from "../models/users-model";

declare global {
    namespace Express {
        interface Request {
            username?: string;
        }
    }
}


export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.get("authorization");

    if (!header) {
        res.status(401).send("No Header Found");
        return;
    }

    const token = header.split(' ')[1];

    if (!token) {
        res.status(401).send("No Token Found");
        return;
    }

    jwt.verify(token, secretKey || (() => { throw new Error("JWT_SECRET_KEY not defined") })(), async (err, payload) => {
        if (err || !payload) {
            res.status(401).send("Token Invalid");
            return;
        }

        const userPayload = payload as { username: string, userId: string };

        const found = await userModel.findById(userPayload.userId);

        if (!found)
            return res.status(401).json({ message: "User no longer exists" });

        req.username = userPayload.username;

        next();
    })
}
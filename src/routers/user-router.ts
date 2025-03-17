import express from "express";
import { register, login, getUserProfilePhoto } from "../services/user-service";
import { upload } from "../middlewares/multer-cdn-upload";
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post("/register", upload.single('userProfileImage'), async (req, res) => {
    try {
        const fileData = req.file ? {
            buffer: req.file.buffer,
            mimetype: req.file.mimetype
        } : null;

        const { username, password } = req.body;
        const { statusCode, statusMessage, data } = await register({ username, password, fileData });
        res.status(statusCode).send(data);
    } catch (err) {
        console.error("Error :", err);
        res.status(500).send({ err });
    }
});

router.get("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { statusCode, statusMessage, data } = await login({ username, password });
        res.status(statusCode).send(data);
    }
    catch (err) {
        console.error("Error :", err);
        res.status(500).send({ err });
    }
});

router.get("/userProfilePhoto", async (req, res) => {
    try {
        const { username } = req.body;
        const { statusCode, statusMessage, data } = await getUserProfilePhoto(username);
        res.status(statusCode).send(data);
    }
    catch (err) {
        console.log("Error :", err);
        res.status(500).send({ err });
    }
})

export default router;

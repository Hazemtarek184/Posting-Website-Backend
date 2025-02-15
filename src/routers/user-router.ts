import express from "express";
import { register, login } from "../services/user-service";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const { statusCode, statusMessage, data } = await register({ username, password });
    res.status(statusCode).send(data);
});

router.get("/login", async (req, res) => {
    const { username, password } = req.body;
    const { statusCode, statusMessage, data } = await login({ username, password });
    res.status(statusCode).send(data);
});

export default router;
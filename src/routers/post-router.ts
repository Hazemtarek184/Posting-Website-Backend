import express from 'express';
import { addPost, getAllPostsByUser, getAllPosts, upVote } from "../services/posts-service";
import { tokenValidation } from '../middlewares/token-validation';

const router = express.Router();


router.get("/allposts", async (req, res) => {
    try {
        const { statusCode, statusMessage, data } = await getAllPosts();
        res.status(statusCode).send(data);
    } catch (err) {
        console.error("Error :", err);
        res.status(500).send({ err });
    }
});

router.post("/upvote", tokenValidation, async (req, res) => {
    try {
        const { id } = req.body;
        const { statusCode, statusMessage, data } = await upVote(id, req.username || '');
        res.status(statusCode).send(data);
    } catch (err) {
        console.error("Error :", err);
        res.status(500).send({ err });
    }
});

router.get("/user", tokenValidation, async (req, res) => {
    try {
        const username: string = req.username || '';
        const { statusCode, statusMessage, data } = await getAllPostsByUser(username);
        res.status(statusCode).send(data);
    } catch (err) {
        console.error("Error :", err);
        res.status(500).send({ err });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, content, username } = req.body;
        const { statusCode, statusMessage, data } = await addPost({ title, content, username });
        res.status(statusCode).send(statusMessage);
    } catch (err) {
        console.error("Error :", err);
        res.status(500).send({ err });
    }
});

export default router;
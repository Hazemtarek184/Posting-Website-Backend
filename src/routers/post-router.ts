import express from 'express';
import { addPost, getAllPostsByUser, getAllPosts, upVote } from "../services/posts-service";
import { tokenValidation } from '../middlewares/token-validation';

const router = express.Router();


router.get("/allposts", async (req, res) => {
    const { statusCode, statusMessage, data } = await getAllPosts();
    res.status(statusCode).send(data);
});

router.post("/upvote", async (req, res) => {
    const { id } = req.body;
    const { statusCode, statusMessage, data } = await upVote(id);
    res.status(statusCode).send(data);
});

router.get("/user", tokenValidation, async (req, res) => {
    const username: string = req.username || '';
    const { statusCode, statusMessage, data } = await getAllPostsByUser(username);
    res.status(statusCode).send(data);
});

router.post("/", async (req, res) => {
    const { title, content, username } = req.body;
    const { statusCode, statusMessage, data } = await addPost({ title, content, username });
    res.status(statusCode).send(statusMessage);
});

export default router;
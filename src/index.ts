import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/user-router";
import postRouter from "./routers/post-router";

const app = express();
const PORT = 8000;
export const secretKey = "638b4945467c15b337631b31301dd3c521cce229481bc54ff9b880c4142020bc6e22594e93861a3faea1c200fd7fbfa0f62146c063fc9426cc4111a4a9e33896";


app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use('/user', userRouter);
app.use('/api/post', postRouter);

mongoose.connect("mongodb://127.0.0.1:27017/PersonalBlog")
    .then(() => {
        console.log("Connected to the database. ");
    }).catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}. `);
});
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/user-router";
import postRouter from "./routers/post-router";

require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


const app = express();
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGO_CONNECTION_URI;
export const secretKey = process.env.JWT_SECRET_KEY;


app.use(express.json());
app.use(cors({
    origin: process.env.URL_CORS_ORIGIN,
}));

app.use('/user', userRouter);
app.use('/api/post', postRouter);

if (!MONGOURI) {
    console.error("Missing MONGO_CONNECTION_URI environment variable");
    process.exit(1);
}

mongoose.connect(MONGOURI)
    .then(() => {
        console.log("Connected to the database.");
    }).catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}. `);
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

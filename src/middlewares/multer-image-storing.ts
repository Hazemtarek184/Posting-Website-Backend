import { Callback } from "mongoose";

const path = require('path');
const multer = require("multer");

const storageConfiguration = multer.diskStorage({
    destination: function (req: Request, file: any, callBack: Callback) {
        callBack(null, 'upload/');
    },
    filename: function (req: Request, file: any, callBack: Callback) {
        const imageFileName = Date.now() + file.originalname;
        callBack(null, imageFileName);
    }
})

const imageFilter = (req: Request, file: Express.Multer.File, cb: Callback) => {
    if (file.mimetype.startsWith('image/'))
        cb(null, true);
    else
        cb(new Error('Not an image'), false);
};

export const upload = multer({ storage: storageConfiguration });
import { Request } from 'express';
import multer from "multer";

// Configure multer to use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Image filter to ensure only images are accepted
const imageFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
        // You can also pass an error message
        // cb(new Error('Only image files are allowed!'), false);
    }
};

// Export the multer middleware with memory storage
export const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

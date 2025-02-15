"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("./models/users");
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5174",
}));
mongoose_1.default.connect("mongodb://127.0.0.1:27017/PersonalBlog")
    .then(() => {
    console.log("Connected to the database. ");
})
    .catch((err) => {
    console.log(err);
});
app.listen(PORT, () => {
    console.log("Listening to port 8000. ");
});
app.post("/user", (req, res) => {
    const user = new users_1.userModel(req.body);
    user.save();
});

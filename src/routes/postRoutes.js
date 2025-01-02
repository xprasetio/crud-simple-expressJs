const express = require("express");
const { getPosts, createPost, updatePost, deletePost } = require("../controllers/postController");

const postRouter = express.Router();

postRouter.get("/posts", getPosts);
postRouter.post("/posts", createPost);
postRouter.put("/posts/:id", updatePost);
postRouter.delete("/posts/:id", deletePost);

module.exports = { postRouter };

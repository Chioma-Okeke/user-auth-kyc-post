const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const create_a_post = require("../controller/postController");

const postRouter = Router().post("/post", authMiddleware, create_a_post);

module.exports = postRouter;

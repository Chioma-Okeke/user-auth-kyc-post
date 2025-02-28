const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { delete_a_user } = require("../controller/userController");

const userRouter = Router().delete("/user/:id", authMiddleware, delete_a_user);

module.exports = userRouter;

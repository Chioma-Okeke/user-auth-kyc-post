const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const create_user_kyc = require("../controller/kycController");

const kycRouter = Router().post("/kyc", authMiddleware, create_user_kyc);

module.exports = kycRouter;

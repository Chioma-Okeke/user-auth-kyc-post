const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token)
        return res
            .status(401)
            .json({ message: "Access denies. Kindly login to access this." });

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedToken)
            return res.status(401).json({ message: "Invalid Token" });

        const user = await userModel
            .findById(verifiedToken.id)
            .select("-password");
        if (!user) return res.status(401).json({ message: "User not found." });

        req.user = user;
        next();
    } catch (error) {
        console.error(error, "server error");
    }
};

module.exports = authMiddleware;

const generateToken = require("../jwt/tokenGenerator");
const kycModel = require("../model/kycModel");
const postModel = require("../model/postModel");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body, "here is req")
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: "Invalid email address" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (user) {
           return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            ...req.body,
            password: hashedPassword,
            kycId: null
        });
        console.log(newUser, "new here")
        const savedUser = await newUser.save();
        const { password: _, ...userData } = savedUser.toObject();
        res.status(200).json(userData);
    } catch (error) {
        console.error(error)
        next({ status: 500, message: "Something went wrong" });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                msg: "No existing user found with that email address",
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return (
                res.status(400).json({ msg: "email address or password incorrect" })
            );
        }

        const { password: _, ...userData } = user.toObject();
        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
        });
        res.status(200).json({ msg: "User logged in", user: userData });
    } catch (error) {
        next({ status: 500, message: "Something went wrong" });
    }
};

const logout = async (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NOD_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
    });
    res.status(200).json({ msg: "User successfully logged out" });
};

const delete_a_user = async (req, res, next) => {
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id != id) {
        return res
            .status(401)
            .json({ msg: "You are not authorized to perform this action" });
    }

    try {
        const user = await userModel.findById(id)
        if (!user) return res.status(404).json({message: "User does not exist."});

        //delete KYC record
        if (user.kycId) await kycModel.findByIdAndDelete(user.kycId);

        //delete any post associated with user
        await postModel.deleteMany({userId: user._id})

        //log user out
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NOD_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
        });

        //delete user
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "User and all user record successfully deleted" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    delete_a_user,
};

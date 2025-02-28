const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        kyc: {
            type: mongoose.Schema.Types.ObjectId,
            ref: kyc,
        },
        postIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userModel);

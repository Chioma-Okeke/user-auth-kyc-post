const mongoose = require("mongoose");

const kycModel = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "user",
            required: true,
        },
        kycInformation: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", kycModel);

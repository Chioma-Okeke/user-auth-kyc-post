const mongoose = require("mongoose");
const userModel = require("./model/userModel");
const postModel = require("./model/postModel");
const kycModel = require("./model/kycModel");

mongoose.connect("mongodb+srv://okekegeraldenne:1KqkzmJZwLveOrkX@lib.wsgse.mongodb.net/user-auth-kyc-post?retryWrites=true&w=majority&appName=lib")
    .then(async () => {
        await userModel.collection.drop();
        console.log("User collection dropped!");

        await postModel.collection.drop();
        console.log("User collection dropped!");

        await kycModel.collection.drop();
        console.log("Kyc collection dropped!");

        mongoose.connection.close();
    })
    .catch((err) => console.error("Error dropping collection:", err));

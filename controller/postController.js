const postModel = require("../model/postModel");
const userModel = require("../model/userModel");

const create_a_post = async (req, res, next) => {
    const userInfo = req.user;

    try {
        const user = await userModel.findById(userInfo);
        if (!user) {
            return res
                .status(401)
                .json({ msg: "You need to be logged in to create a post" });
        }

        const newPost = new postModel({ ...req.body, userId: userInfo._id });
        const createdPost = await newPost.save();

        user.postIds.push(createdPost._id);
        await user.save();
        res.status(200).json({
            message: "Post successfully created",
            createdPost,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = create_a_post;

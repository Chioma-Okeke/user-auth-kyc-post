const kycModel = require("../model/kycModel");
const userModel = require("../model/userModel");

const create_user_kyc = async (req, res, next) => {
    const userInfo = req.user;
    const { kycInformation } = req.body;

    if (!kycInformation) {
        return res.status(400).json({
            message: "Please a value is required. KYC information missing.",
        });
    }

    try {
        const user = await userModel.findById(userInfo);
        if (!user) {
            return res
                .status(401)
                .json({ msg: "You need to be logged in to create a KYC" });
        }

        const kyc = new kycModel({ ...req.body, userId: user._id });
        const createdKyc = await kyc.save();

        await userModel.findByIdAndUpdate(user._id, {
            kycId: createdKyc._id,
        });
        res.status(200).json({
            message: "KYC successfully created and added to user profile.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = create_user_kyc;

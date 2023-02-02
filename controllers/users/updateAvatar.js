const { User } = require("../../model");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res) => {
    try {
        const { path: tempUpload, originalname } = req.file;
        const resultUpload = path.join(avatarsDir, originalname);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", originalname);
        await User.findByIdAndUpdate(req.user.__id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;

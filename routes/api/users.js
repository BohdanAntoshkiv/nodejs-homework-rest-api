const express = require("express");

const { ctrlWrapper, upload, authWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authWrapper, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", upload.single("avatar"), authWrapper, ctrlWrapper(ctrl.updateAvatar));

module.exports = router;

const express = require("express");
const { userController } = require("../controllers");
const { userValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/users", validate(userValidator.createUserSchema), userController.createUser);
router.get("/view", userController.viewUsers);

module.exports = router;
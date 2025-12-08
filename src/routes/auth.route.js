const express = require("express");
const { authController } = require("../controllers");
const { authValidator } = require("../validators");
const { validate } = require("../middlewares/validation.middleware");
const router = express.Router();

router.post("/login", validate(authValidator.loginSchema), authController.login);
router.post("/register", validate(authValidator.registerSchema), authController.register);

module.exports = router;
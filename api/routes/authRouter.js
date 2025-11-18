const express = require("express");
const validate = require("../middleware/validate.js");
const { authLoginSchema, authSignupSchema } = require("../config/schemas.js");
const { login, signup } = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", validate(authSignupSchema), signup);
router.post("/login", validate(authLoginSchema), login);

module.exports = router;

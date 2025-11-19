const express = require("express");
const validate = require("../middleware/validate.js");
const {
  authLoginSchema,
  authSignupSchema,
} = require("../config/ValidationSchemas.js");
const { login, signup } = require("../controllers/authController.js");

module.exports = function ({ User }) {
  const router = express.Router();

  router.post("/signup", validate(authSignupSchema), signup(User));
  router.post("/login", validate(authLoginSchema), login(User));
  return router;
};

const express = require("express");
const validate = require("../middleware/validate.js");
const {
  authLoginSchema,
  authSignupSchema,
} = require("../config/validationSchemas.js");
const { login, signup, refresh } = require("../controllers/authController.js");

module.exports = function ({ User, RefreshToken }) {
  const router = express.Router();

  router.post(
    "/signup",
    validate(authSignupSchema),
    signup({ User, RefreshToken })
  );
  router.post(
    "/login",
    validate(authLoginSchema),
    login({ User, RefreshToken })
  );
  router.get("/refresh", refresh({ User, RefreshToken }));
  return router;
};

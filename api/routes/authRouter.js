const express = require("express");
const validate = require("../middleware/validate.js");
const {
  authLoginSchema,
  authSignupSchema,
} = require("../config/validationSchemas.js");
const {
  login,
  signup,
  refresh,
  logout,
} = require("../controllers/authController.js");
const authentication = require("../middleware/authentication.js");

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
  router.get("/logout", authentication, logout({ RefreshToken, User }));
  return router;
};

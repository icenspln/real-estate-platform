const express = require("express");
const { authSignupSchema } = require("../config/ValidationSchemas");
const validate = require("../middleware/validate");
const bootstrapController = require("../controllers/bootstrapController");

module.exports = ({ User }) => {
  const router = express.Router();

  router.post("/admin", validate(authSignupSchema), bootstrapController(User));

  return router;
};

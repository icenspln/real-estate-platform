const express = require("express");
const { adminSignup } = require("../config/ValidationSchemas");
const validate = require("../middleware/validate");
const bootstrapController = require("../controllers/bootstrapController");

module.exports = ({ User }) => {
  const router = express.Router();

  router.post("/admin", validate(adminSignup), bootstrapController(User));

  return router;
};

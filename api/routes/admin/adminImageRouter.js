const express = require("express");
const authentication = require("../../middleware/authentication");
const RBAC = require("../../middleware/RBACmiddleware");
const createImage = require("../../controllers/imageController");
const uploadMiddleware = require("../../middleware/uploadMiddleware");
const adminPerms = require("../../config/roles").admin;

module.exports = function ({ Image, Property }) {
  const router = express.Router();

  router.post(
    "/create",
    authentication,
    RBAC(adminPerms),
    uploadMiddleware,
    createImage({ Image, Property })
  );

  return router;
};

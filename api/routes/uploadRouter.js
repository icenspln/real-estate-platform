const express = require("express");
const authentication = require("../middleware/authentication");
const RBAC = require("../middleware/RBACmiddleware");
const uploadImage = require("../controllers/imageController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

module.exports = function ({ Image }) {
  const router = express.Router();

  router.post(
    "/",
    authentication,
    RBAC(["create_image"]),
    uploadMiddleware,
    uploadImage(Image)
  );

  return router;
};

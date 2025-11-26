const express = require("express");
const authentication = require("../middleware/authentication");
const RBAC = require("../middleware/RBACmiddleware");
const {
  createImage,
  createOwnImage,
} = require("../controllers/imageController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

module.exports = function ({ Image, Property }) {
  const router = express.Router();

  router.post(
    "/create",
    authentication,
    RBAC(["create_image"]),
    uploadMiddleware,
    createImage({ Image, Property })
  );
  router.post(
    "/profile/create",
    authentication,
    RBAC(["create_own_image"]),
    uploadMiddleware,
    createOwnImage({ Image, Property })
  );

  return router;
};

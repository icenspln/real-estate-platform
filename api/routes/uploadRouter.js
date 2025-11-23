const express = require("express");
const authentication = require("../middleware/authentication");
const RBAC = require("../middleware/RBACmiddleware");
const uploadImage = require("../controllers/imageController");

module.exports = function ({ Image }) {
  const router = express.Router();

  router.post(
    "/",
    authentication,
    RBAC(["create_image"]),
    // validate(imageCreation),
    uploadImage(Image)
  );

  return router;
};

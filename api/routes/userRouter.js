const express = require("express");
const authentication = require("../middleware/authentication");
const RBAC = require("../middleware/RBACmiddleware");
const { debug } = require("../helper");

// router to for user resource CRUD
module.exports = ({ _User }) => {
  const router = express.Router();

  router.post("/create", authentication, RBAC(["create_user"]), () => {
    debug("allow create_user");
  });
  router.get("/", authentication, RBAC(["read_user"]), () => {
    debug("allow read all admins");
  });
  router.get("/:id", authentication, RBAC(["read_user"]), () => {
    debug("allow read one admin");
  });
  router.put("/:id", authentication, RBAC(["update_user"]), () => {
    debug("allow update one admin");
  });
  router.delete("/:id", authentication, RBAC(["delete_user"]), () => {
    debug("allow delete one admin");
  });

  return router;
};

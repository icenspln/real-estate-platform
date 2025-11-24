const express = require("express");
const authentication = require("../../middleware/authentication.js");
const RBAC = require("../../middleware/RBACmiddleware.js");
const {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../../controllers/userController.js");
const { userCreation } = require("../../config/validationSchemas.js");
const validate = require("../../middleware/validate.js");
const adminPerms = require("../../config/roles").admin;

// router to for user resource CRUD
module.exports = ({ User }) => {
  const router = express.Router();

  router.post(
    "/create",
    authentication,
    RBAC(adminPerms),
    validate(userCreation),
    createUser(User)
  );

  router.get("/", authentication, RBAC(adminPerms), getUsers(User));

  router.get("/:id", authentication, RBAC(adminPerms), getOneUser(User));

  router.put("/:id", authentication, RBAC(adminPerms), updateUser(User));
  router.delete("/:id", authentication, RBAC(adminPerms), deleteUser(User));

  return router;
};

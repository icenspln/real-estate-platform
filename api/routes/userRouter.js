const express = require("express");
const authentication = require("../middleware/authentication.js");
const RBAC = require("../middleware/RBACmiddleware.js");
const {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController.js");
const {
  userCreation,
  updateOwnProfile,
} = require("../config/validationSchemas.js");
const validate = require("../middleware/validate.js");

// router to for user resource CRUD
module.exports = ({ User }) => {
  const router = express.Router();

  router.post(
    "/create",
    authentication,
    RBAC(["create_user"]),
    validate(userCreation),
    createUser(User)
  );

  router.get("/", authentication, RBAC(["read_user"]), getUsers(User));

  router.get(
    "/profile",
    authentication,
    RBAC(["read_own_user"]),
    getProfile(User)
  );

  router.put(
    "/profile",
    authentication,
    RBAC(["update_own_user"]),
    validate(updateOwnProfile),
    updateProfile(User)
  );

  router.delete(
    "/profile",
    authentication,
    RBAC(["delete_own_user"]),
    deleteProfile(User)
  );

  router.get("/:id", authentication, RBAC(["read_user"]), getOneUser(User));

  router.put("/:id", authentication, RBAC(["update_user"]), updateUser(User));

  router.delete(
    "/:id",
    authentication,
    RBAC(["delete_user"]),
    deleteUser(User)
  );

  return router;
};

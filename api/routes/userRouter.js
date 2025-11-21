const express = require("express");
const authentication = require("../middleware/authentication");
const RBAC = require("../middleware/RBACmiddleware");
const {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// router to for user resource CRUD
module.exports = ({ User }) => {
  const router = express.Router();

  router.post("/create", authentication, RBAC(["create_user"]));

  router.get("/", authentication, RBAC(["read_user"]), getUsers(User));

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

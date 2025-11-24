const express = require("express");
const adminUserRouter = require("./adminUserRouter.js");
const adminPropertyRouter = require("./adminPropertyRouter.js");
const adminImageRouter = require("./adminImageRouter.js");

module.exports = function (models) {
  const router = express.Router();

  router.use("/user", adminUserRouter(models));
  router.use("/property", adminPropertyRouter(models));
  router.use("/image", adminImageRouter(models));

  return router;
};

const express = require("express");
const errorHandler = require("./middleware/error.js");
const authRouter = require("./routes/auth/authRouter.js");
const bootstrapRouter = require("./routes/bootstrapRouter.js");
const adminRouter = require("./routes/admin/adminRouter.js");

const createApp = ({ _sequelize, models }) => {
  const app = express();

  // middleware
  app.use(express.json());

  // routes
  app.use("/bootstrap", bootstrapRouter(models));
  app.use("/auth", authRouter(models));
  app.use("/admin", adminRouter(models));

  // error handler
  app.use(errorHandler);

  return app;
};

module.exports = createApp;

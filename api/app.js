const express = require("express");
const errorHandler = require("./middleware/error.js");
const authRouter = require("./routes/authRouter.js");
const bootstrapRouter = require("./routes/bootstrapRouter.js");
const userRouter = require("./routes/userRouter.js");

const createApp = ({ _sequelize, models }) => {
  const app = express();

  // middleware
  app.use(express.json());

  // routes
  app.use("/bootstrap", bootstrapRouter(models));
  app.use("/auth", authRouter(models));
  app.use("/user", userRouter(models));

  // error handler
  app.use(errorHandler);

  return app;
};

module.exports = createApp;

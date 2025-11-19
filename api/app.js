const express = require("express");
require("dotenv").config();
const errorHandler = require("./middleware/error.js");
const authRouter = require("./routes/authRouter.js");

const createApp = ({ _sequelize, models }) => {
  const app = express();

  // middleware
  app.use(express.json());

  // routes
  app.get("/", (req, res) => {
    res.status(200).send();
  });
  app.use("/auth", authRouter(models));

  // error handler
  app.use(errorHandler);

  return app;
};

module.exports = createApp;

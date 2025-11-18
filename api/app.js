const express = require("express");
require("dotenv").config();
const errorHandler = require("./middleware/error.js");
const authRouter = require("./routes/authRouter.js");

const app = express();
// middleware
app.use(express.json());

// routes
app.use("/auth", authRouter);

// error handler
app.use(errorHandler);

module.exports = app;

import express from "express";
import "dotenv/config";
import errorHandler from "./middleware/error.js";
import authRouter from "./routes/authRouter.js";

const app = express();
// middleware
app.use(express.json());

// routes
app.use("/auth", authRouter);

// error handler
app.use(errorHandler);

export default app;

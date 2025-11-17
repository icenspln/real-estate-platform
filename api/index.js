import express from "express";
import "dotenv/config";
import sequelize from "./db.js";
import errorHandler from "./middleware/error.js";
import authRouter from "./routes/authRouter.js";
import { logg, error, debug } from "./helper.js";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/auth", authRouter);

// error handler
app.use(errorHandler);

// db
sequelize
  .authenticate()
  .then((res) => {
    logg("DB connection Successful");
    app.listen(process.env.PORT, process.env.HOST, () => {
      logg(`server is listening on port ${process.env.PORT}`, 1);
    });
  })
  .catch((err) => {
    error(err.message);
    error("DB connection Failed");
  });

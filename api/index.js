import express from "express";
import "dotenv/config";
import sequelize from "./db.js";
import { log } from "./helper.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  log(`server is listening on port ${process.env.PORT}`, 1);
});

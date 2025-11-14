import Sequelize from "sequelize";
import { log } from "./helper.js";

const sequelize = new Sequelize(process.env.DB_URI);

(async () => {
  try {
    await sequelize.authenticate();
    log("DB connection Successful", 1);
  } catch (err) {
    console.error("[ERROR] .");
    log("DB connection Failed", 3);
  }
})();

export default sequelize;

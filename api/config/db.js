import Sequelize from "sequelize";
import { logg, error } from "../helper.js";

const sequelize = new Sequelize(process.env.DB_URI);

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    logg("DB connection Successful");
  } catch (err) {
    error("DB connection Failed");
    error(err.message);
  }
};

export { initDatabase, sequelize };

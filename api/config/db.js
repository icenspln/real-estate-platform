const Sequelize = require("sequelize");
const { logg, error } = require("../helper.js");

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

module.exports = { initDatabase, sequelize };

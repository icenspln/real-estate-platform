const Sequelize = require("sequelize");
const { logg, error } = require("../helper.js");

// initialize a new connection on call (not on load)
const initDatabase = (dbConf) => {
  try {
    const sequelize = new Sequelize(dbConf.DB_URI);
    logg("DB initialization success");
    return sequelize;
  } catch (err) {
    error("DB initialization fail");
    error(err.message);
    throw new Error("DB initialization fail");
  }
};

module.exports = { initDatabase };

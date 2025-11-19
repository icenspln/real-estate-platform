const { initDatabase } = require("../config/db");
const initModels = require("../models/index");

module.exports = async () => {
  const sequelize = initDatabase({
    DB_URI: process.env.DB_TEST_URI,
  });
  const models = initModels(sequelize);

  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  return { sequelize, models };
};

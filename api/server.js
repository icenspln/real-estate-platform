const http = require("node:http");
const { error, logg } = require("./helper.js");
const { initDatabase } = require("./config/db.js");
const initModels = require("./models/index.js");
const createApp = require("./app.js");
require("dotenv").config();

const main = async () => {
  const sequelize = initDatabase({ DB_URI: process.env.DB_URI });
  const models = initModels(sequelize);

  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  const app = createApp({ sequelize, models });
  http.createServer(app).listen(process.env.PORT, process.env.HOST, () => {
    logg(`server is listening on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  error("Failed to start the server");
  error(err.message);
  process.exit(1);
});

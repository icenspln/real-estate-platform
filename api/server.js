const { error, logg } = require("./helper.js");
const app = require("./app.js");
const { initDatabase } = require("./config/db.js");

const main = async () => {
  await initDatabase();

  app.listen(process.env.PORT, process.env.HOST, () => {
    logg(`server is listening on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  error("Failed to start the server");
  error(err.message);
  process.exit(1);
});

import { error, logg } from "./helper.js";
import app from "./app.js";
import { initDatabase } from "./config/db.js";

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

const { error, debug } = require("../helper");
const fs = require("node:fs/promises");

module.exports = function uploadImage(_Image) {
  // function writes
  return async (req, res, next) => {
    try {
      // test write
      const filename = "test";
      const fileExtension = "css";
      const content = "another content!";
      debug(process.env.STATIC_DIR);
      await fs.writeFile(
        `${process.env.STATIC_DIR}/${filename}.${fileExtension}`,
        content,
        {
          flag: "w+",
        }
      );
    } catch (err) {
      error(err.message);
      next(err);
    }
  };
};

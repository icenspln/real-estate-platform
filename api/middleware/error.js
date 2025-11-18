const { error } = require("../helper.js");

module.exports = (err, _req, res, _next) => {
  if (err) {
    error("Error middleware reached");
    error(err.message);
    return res.status(500).json({ success: false, message: "Internal error" });
  }
};

import { error } from "../helper.js";

export default (err, req, res, next) => {
  if (err) {
    error("Error middleware reached");
    error(err.message);
    return res.status(500).json({ success: false, message: "Internal error" });
  }
};

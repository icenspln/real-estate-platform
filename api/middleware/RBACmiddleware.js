const { error } = require("../helper.js");
const roles = require("../config/roles.js");

module.exports = (requiredPermissions) => (req, res, next) => {
  try {
    const role = req.user.role;
    if (
      !roles[role] ||
      !requiredPermissions.every((perm) => roles[role].includes(perm))
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  } catch (err) {
    error(err.message);
    next(err);
  }
};

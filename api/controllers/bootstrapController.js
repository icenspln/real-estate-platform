// this route controller is only enabled once, if the admin token exists in the env

const { logg, error } = require("../helper");
const bcrypt = require("bcryptjs");

module.exports = (User) => async (req, res, next) => {
  try {
    const { token } = req.query;
    const { firstName, lastName, username, email, password } = req.body;
    // check if admins exits
    const { count } = await User.findAndCountAll({
      where: {
        role: "admin",
      },
    });

    if (count > 0) {
      logg("ADMIN EXISTS");
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    if (token !== process.env.ADMIN_TOKEN) {
      logg("FALSE TOKEN");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      username,
      email,
      role: "admin",
      password: hash,
    });
    res.status(201).json({ success: true, message: "Admin created" });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

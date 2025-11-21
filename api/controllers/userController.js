const { error } = require("../helper");

const getUsers = (User) => async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({ success: true, users });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const getOneUser = (User) => async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const updateUser = (User) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.set({ firstName, lastName, username, email, password });
    await user.save();
    return res.status(200).json({ success: true, user });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const deleteUser = (User) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    await user.destroy();
    return res.status(200).json({ success: true, user });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

module.exports = { getUsers, getOneUser, updateUser, deleteUser };

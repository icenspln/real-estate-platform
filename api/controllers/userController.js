const { error } = require("../utils/helper");
const bcrypt = require("bcryptjs");

const createUser = (User) => async (req, res, next) => {
  try {
    // validated body
    const { firstName, lastName, username, email, role, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      username,
      email,
      role,
      password: hash,
    });
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

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
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      user.set({ firstName, lastName, username, email, password: hash });
    }
    user.set({ firstName, lastName, username, email });
    await user.save();
    return res.status(200).json({ success: true, message: "User updated" });
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
    return res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const getProfile = (User) => async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId, {
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

const updateProfile = (User) => async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (req.body.password) {
      const hash = await bcrypt.hash(req.body.password, 10);
      user.set({ ...req.body, password: hash });
    } else {
      user.set(req.body);
    }

    await user.save();
    res.status(200).json({ success: true, message: "User updated" });
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const deleteProfile = (User) => async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    error(err.message);
    next(err);
  }
};
module.exports = {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
  getProfile,
  updateProfile,
  deleteProfile,
};

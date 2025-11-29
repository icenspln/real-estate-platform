const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const signup = (User) => async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User email already in use" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({ ...req.body, password: hash });
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    next(err);
  }
};

const login = (User) => async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res
        .status(401) // unauthorized -> because not authenticated correctly
        .json({ success: false, message: "Wrong credentials" });
    }

    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordCorrect) {
      return res
        .status(401) // unauthorized -> because not authenticated correctly
        .json({ success: false, message: "Wrong credentials" });
    }

    // correct credentials
    // generate token
    const token = JWT.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15min" }
    );

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, signup };

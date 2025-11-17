import { debug, error } from "../helper.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
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

export const login = async (req, res, next) => {
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

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    next(err);
  }
};

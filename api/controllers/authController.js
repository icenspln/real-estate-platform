const bcrypt = require("bcryptjs");
const {
  signAccessToken,
  createJti,
  signRefreshToken,
  persistRefreshToken,
  setRefreshCookie,
  rotateRefreshToken,
  hashToken,
} = require("../utils/token");
const JWT = require("jsonwebtoken");
const { error } = require("../utils/helper");

const signup =
  ({ User }) =>
  async (req, res, next) => {
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

const login =
  ({ User, RefreshToken }) =>
  async (req, res, next) => {
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
      const token = signAccessToken(user);

      const jti = createJti();
      const refreshToken = signRefreshToken({ userInstance: user, jti });

      persistRefreshToken(
        {
          userInstance: user,
          jti,
          refreshToken,
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        },
        RefreshToken
      );

      setRefreshCookie(refreshToken, res);

      res
        .status(200)
        .json({ success: true, message: "Login successful", token: token });
    } catch (err) {
      next(err);
    }
  };

const refresh =
  ({ RefreshToken, User }) =>
  async (req, res, next) => {
    try {
      // check rt
      const rt = req.cookies?.rt;
      if (!rt)
        return res
          .status(400)
          .json({ success: false, message: "No token provided" });

      // check claim authenticity
      let decoded;
      try {
        decoded = JWT.verify(rt, process.env.JWT_REFRESH_SECRET);
      } catch (err) {
        error(err.message);
        return res.status(401).json({
          success: false,
          message: "Authentication failed or expired authentication",
        });
      }

      // check existence in DB
      let { _userId, jti } = decoded;
      const tokenHash = hashToken(rt);

      const refreshTokenInstance = await RefreshToken.findOne({
        where: {
          jti: jti,
          tokenHash,
        },
      });

      if (!refreshTokenInstance) {
        return res
          .status(401)
          .json({ success: false, message: "Token not recognized" });
      }

      // check "expiresAt", "revokedAt" state and "replaceBy" state
      if (refreshTokenInstance.expiresAt < new Date(Date.now())) {
        return res
          .status(401)
          .json({ success: false, message: "Token expired" });
      } else if (
        refreshTokenInstance.revokedAt ||
        refreshTokenInstance.replacedBy
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Token revoked" });
      }

      // all checked! proceeding..
      const userInstance = await User.findByPk(decoded.userId);
      const accessToken = await rotateRefreshToken(
        { refreshTokenInstance, req, res, userInstance },
        RefreshToken
      );

      res.json({ success: true, token: accessToken });
    } catch (err) {
      next(err);
    }
  };

const logout =
  ({ RefreshToken }) =>
  async (req, res, next) => {
    try {
      const tokens = await RefreshToken.findAll({
        where: { UserId: req.user.userId, revokedAt: null },
      });

      if (tokens.length > 0) {
        for (let i = 0; i < tokens.length; ++i) {
          tokens[i].set({ revokedAt: new Date() });
          await tokens[i].save();
        }
      }

      res.clearCookie("rt", { path: "/api/auth/refresh" });
      res.json({ success: true, message: "Logged out" });
    } catch (err) {
      next(err);
    }
  };
module.exports = { login, signup, refresh, logout };

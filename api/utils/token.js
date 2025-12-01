const JWT = require("jsonwebtoken");
const crypto = require("node:crypto");

const ACCESS_TOKEN_TTL = "15min"; // TTL: time to live
const REFRESH_TOKEN_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

const hashToken = (token) => {
  const hash = crypto.createHash("sha256");
  return hash.update(token).digest("hex");
};

// JWT identifier
const createJti = () => {
  const randomness = crypto.randomBytes(16);
  return randomness.toString("hex");
};

const signAccessToken = (userInstance) => {
  return JWT.sign(
    { userId: userInstance.id, role: userInstance.role },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
  );
};

const signRefreshToken = ({ userInstance, jti }) => {
  return JWT.sign(
    { userId: userInstance.id, jti },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_TTL_SEC,
    }
  );
};

// saves refresh token (hash only) + meta data to db
const persistRefreshToken = async (
  { userInstance, jti, refreshToken, ip, userAgent },
  RefreshToken
) => {
  console.log("[DEBUG]", userAgent);
  const tokenHash = hashToken(refreshToken);
  const persistedRefreshToken = await RefreshToken.create({
    tokenHash,
    jti,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SEC * 1000), // in 7 days from now
    ip,
    userAgent,
  });
  persistedRefreshToken.setUser(userInstance);
  return persistedRefreshToken;
};

const setRefreshCookie = (refreshToken, res) => {
  res.cookie("rt", refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_TTL_SEC * 1000,
    // secure: true,
    path: "/api/auth/refresh",
    sameSite: true,
  });
};

// assuming the submitted refresh token is valid, we revoke the old one, issue a new Rt, sets it to the res set-cookie to the new Rt
// and return a new access token
const rotateRefreshToken = async (
  { refreshTokenInstance, req, res, userInstance },
  RefreshToken
) => {
  const jti = createJti();

  // revoke
  refreshTokenInstance.set({ revokedAt: new Date(Date.now()) });
  refreshTokenInstance.set({ replacedBy: jti });
  await refreshTokenInstance.save();

  // issue new pair
  const accesstoken = signAccessToken(userInstance);
  const refreshToken = signRefreshToken({ userInstance, jti });

  await persistRefreshToken(
    {
      userInstance, // <-----------------
      jti,
      refreshToken,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "",
    },
    RefreshToken
  );

  setRefreshCookie(refreshToken, res);

  return accesstoken;
};

module.exports = {
  hashToken,
  signAccessToken,
  createJti,
  signRefreshToken,
  persistRefreshToken,
  setRefreshCookie,
  rotateRefreshToken,
};

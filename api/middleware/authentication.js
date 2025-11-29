const JWT = require("jsonwebtoken");

/* 
    checking authenticity of the JWT claim
    logic:
    if the server doesn't know you (aka unauthenticated) OR authenticated incorrectly -> 401 unauthorized
    if the server knows who you are (aka authenticated) AND believes who you claim to be but your current identity is not previliged enough for the request -> 403 forbidden
*/

function authentication(req, res, next) {
  try {
    const authHeader = req.header("Authorization") || "";

    const [scheme, tokenFromHeader] = authHeader.split(" ");
    const tokenFromCookie = req.cookies?.access_token;

    const token =
      scheme === "Bearer" && tokenFromHeader
        ? tokenFromHeader
        : tokenFromCookie;

    if (!token) {
      // is this case; we consider the token to be non-existant;
      // so we dont know who you are
      // 401 unauthorized
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err instanceof JWT.TokenExpiredError) {
        return res
          .status(401)
          .json({ success: false, message: "Authorization header expired" });
      } else if (err) {
        // signature dont match
        // authenticated incorrectly
        // 401 unauthorized
        return res
          .status(401)
          .json({ success: false, message: "Unauthenticated" });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;

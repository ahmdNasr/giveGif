const jwt = require("jsonwebtoken");

function makeDoAuthMiddleware(validTokenType = "access") {
  // factory
  return function doAuthMiddleware(req, res, next) {
    const __unauthorized = () =>
      res.status(401).json({ message: "Forbidden. Please login first." });

    try {
      const token = extractTokenFromRequest(req, validTokenType);
      if (!token) {
        return __unauthorized();
      }

      const userClaims = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"],
      });
      if (userClaims.tokenType !== validTokenType) {
        return __unauthorized();
      }

      // SUCCESS
      req.userClaims = userClaims;
      next();
    } catch (error) {
      console.log(error);
      return __unauthorized();
    }
  };
}

function extractTokenFromRequest(req, tokenType = "access") {
  if (tokenType === "refresh") {
    return req.session?.refreshToken || req.body?.refreshToken;
  }

  const tokenInfo = req.headers.token;
  if (!tokenInfo) {
    return null;
  }

  const [tokenStrategy, token] = tokenInfo.split(" ");
  if (tokenStrategy !== "JWT" || !token) {
    return null;
  }

  return token;
}

module.exports = {
  makeDoAuthMiddleware,
};

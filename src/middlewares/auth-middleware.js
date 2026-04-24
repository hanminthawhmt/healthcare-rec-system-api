const jwt = require("jsonwebtoken");
const env = require("../config/env");
const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer")) {
      const error = new Error("Not authorized, no token");
      error.statusCode = 401;
      return next(error);
    }
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    error.message = "Not authorized, token failed";
    error.statusCode = 401;
    next(error);
  }
};

module.exports = { protect };

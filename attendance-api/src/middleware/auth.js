const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    const err = new Error("Missing Authorization header");
    err.statusCode = 401;
    throw err;
  }

  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // { sub, role, email }
    next();
  } catch {
    const err = new Error("Invalid or expired token");
    err.statusCode = 401;
    throw err;
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const err = new Error("Forbidden");
      err.statusCode = 403;
      throw err;
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
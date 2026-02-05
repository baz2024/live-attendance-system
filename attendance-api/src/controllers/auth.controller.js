const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { asyncHandler } = require("../utils/asyncHandler");
const { findUserByEmail, createUser } = require("../models/users.model");

const signup = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const existing = await findUserByEmail(email);
  if (existing) {
    const err = new Error("Email already registered");
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const userId = await createUser({
    email,
    passwordHash,
    role: role || "STUDENT"
  });

  res.status(201).json({ ok: true, userId });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

  res.json({ ok: true, token });
});

module.exports = { signup, login };
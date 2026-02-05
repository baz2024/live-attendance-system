const { pool } = require("../config/db");

async function findUserByEmail(email) {
  const [rows] = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = ?",
    [email]
  );
  return rows[0] || null;
}

async function createUser({ email, passwordHash, role }) {
  const [result] = await pool.query(
    "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
    [email, passwordHash, role]
  );
  return result.insertId;
}

module.exports = { findUserByEmail, createUser };
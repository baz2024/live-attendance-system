const { asyncHandler } = require("../utils/asyncHandler");
const { createStudent, listStudents } = require("../models/students.model");

const create = asyncHandler(async (req, res) => {
  const { studentNumber, fullName, email } = req.body;
  const id = await createStudent({ studentNumber, fullName, email });
  res.status(201).json({ ok: true, id });
});

const list = asyncHandler(async (req, res) => {
  const q = (req.query.q || "").trim();
  const students = await listStudents({ q: q || null });
  res.json({ ok: true, students });
});

module.exports = { create, list };
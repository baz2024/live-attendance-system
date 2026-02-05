const { asyncHandler } = require("../utils/asyncHandler");
const { attendanceByModuleAndRange } = require("../models/reports.model");

const moduleReport = asyncHandler(async (req, res) => {
  const { moduleCode, from, to } = req.query;

  if (!moduleCode || !from || !to) {
    const err = new Error("moduleCode, from, and to are required");
    err.statusCode = 400;
    throw err;
  }

  const rows = await attendanceByModuleAndRange({ moduleCode, from, to });
  res.json({ ok: true, rows });
});

module.exports = { moduleReport };
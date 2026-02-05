const { asyncHandler } = require("../utils/asyncHandler");
const { getSessionByCode } = require("../models/sessions.model");
const { findStudentById } = require("../models/students.model");
const { checkIn, listAttendanceForSession, countAttendanceForSession } = require("../models/attendance.model");

const checkInByCode = asyncHandler(async (req, res) => {
  const { sessionCode, studentId } = req.body;

  const session = await getSessionByCode(sessionCode);
  if (!session) {
    const err = new Error("Invalid session code");
    err.statusCode = 404;
    throw err;
  }
  if (session.status !== "OPEN") {
    const err = new Error("Session is closed");
    err.statusCode = 409;
    throw err;
  }

  const student = await findStudentById(studentId);
  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  // Optional: automatic late policy (10 minutes after start)
  const now = new Date();
  const start = new Date(session.starts_at);
  const minutesLate = (now - start) / (1000 * 60);
  const status = minutesLate > 10 ? "LATE" : "PRESENT";

  const result = await checkIn({ sessionId: session.id, studentId, status });
  res.status(result.inserted ? 201 : 200).json({ ok: true, sessionId: session.id, result });
});

const liveList = asyncHandler(async (req, res) => {
  const sessionId = Number(req.params.sessionId);
  const attendance = await listAttendanceForSession(sessionId);
  const count = await countAttendanceForSession(sessionId);
  res.json({ ok: true, count, attendance });
});

module.exports = { checkInByCode, liveList };
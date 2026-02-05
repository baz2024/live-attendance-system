const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { env } = require("./config/env");
const { errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const studentsRoutes = require("./routes/students.routes");
const sessionsRoutes = require("./routes/sessions.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const reportsRoutes = require("./routes/reports.routes");

const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Attendance API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/reports", reportsRoutes);

app.use(errorHandler);

module.exports = { app };
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Stack, TextField, Button, Alert } from "@mui/material";
import { apiFetch } from "../api/client";

export default function StudentCheckIn() {
  const nav = useNavigate();

  const [sessionCode, setSessionCode] = useState("");
  const [studentId, setStudentId] = useState(1);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/api/attendance/checkin", {
        method: "POST",
        body: { sessionCode: sessionCode.trim(), studentId: Number(studentId) },
      });

      const code = sessionCode.trim().toUpperCase();
      const email = data?.student?.email || "";

      if (data?.result?.already) {
        setMessage("You are already checked in for this session.");
      } else {
        setMessage("Check-in successful.");
        nav(`/success?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Student Check-in</Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter the session code shared by your lecturer.
        </Typography>

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack component="form" spacing={2} onSubmit={submit}>
          <TextField
            label="Session Code"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
            fullWidth
          />

          <TextField
            label="Student ID (demo)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            type="number"
            inputProps={{ min: 1 }}
            fullWidth
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Checking in..." : "Check In"}
          </Button>
        </Stack>

        <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
          Demo note: studentId is entered manually. In production it comes from the logged-in student profile.
        </Typography>
      </Paper>
    </Container>
  );
}
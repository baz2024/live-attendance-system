import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { apiFetch } from "../api/client";
import { useAuth } from "../auth/AuthContext";

export default function RegisterStudent() {
  const nav = useNavigate();
  const { login } = useAuth();

  // REQUIRED fields (must match backend schema)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [fullName, setFullName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔹 Build payload EXACTLY as backend expects
      const payload = {
        email: email.trim(),
        password,
        studentNumber: studentNumber.trim(),
        fullName: fullName.trim(),
      };

      // Debug (remove later if you want)
      console.log("Register payload:", payload);

      // Register student
      await apiFetch("/api/auth/register-student", {
        method: "POST",
        auth: false,
        body: payload,
      });

      // Auto-login after registration
      await login(payload.email, password);

      nav("/student/checkin");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Registration
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Create a student account to check in to attendance sessions.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Stack component="form" spacing={2} onSubmit={onSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Student Number"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>

          <Button variant="text" onClick={() => nav("/login")}>
            Back to Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
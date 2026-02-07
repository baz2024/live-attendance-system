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
  Divider,
} from "@mui/material";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login, role } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);

      // Lecturer vs Student redirect
      if (role === "LECTURER") nav("/lecturer");
      else nav("/student/checkin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Stack component="form" spacing={2} onSubmit={onSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2">
          New student?
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => nav("/register/student")}
        >
          Register as Student
        </Button>
      </Paper>
    </Container>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Paper, Typography, Stack, TextField, Button,
  Alert, Divider, Table, TableHead, TableRow, TableCell, TableBody, Chip
} from "@mui/material";
import { apiFetch } from "../api/client";

export default function LecturerHome() {
  const nav = useNavigate();

  const [moduleCode, setModuleCode] = useState("B8IT146");
  const [title, setTitle] = useState("Week Attendance");
  const [startsAt, setStartsAt] = useState(new Date().toISOString().slice(0, 16));

  const [sessions, setSessions] = useState([]);
  const [createdCode, setCreatedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadSessions() {
    const data = await apiFetch("/api/sessions");
    setSessions(data.sessions || []);
  }

  useEffect(() => {
    loadSessions().catch((e) => setError(e.message));
  }, []);

  async function createSession(e) {
    e.preventDefault();
    setError("");
    setCreatedCode("");
    setLoading(true);
    try {
      const data = await apiFetch("/api/sessions", {
        method: "POST",
        body: { moduleCode, title, startsAt },
      });
      setCreatedCode(data.sessionCode);
      await loadSessions();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Lecturer Dashboard</Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Create Attendance Session</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack component="form" spacing={2} onSubmit={createSession}>
          <TextField label="Module Code" value={moduleCode} onChange={(e) => setModuleCode(e.target.value)} />
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField
            label="Starts At"
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Creating..." : "Create Session"}
          </Button>
        </Stack>

        {createdCode && (
          <>
            <Divider sx={{ my: 3 }} />
            <Alert severity="success">
              <Typography><b>Session Code:</b> {createdCode}</Typography>
              <Typography variant="body2">Share this code with students to check in.</Typography>
            </Alert>
          </>
        )}

        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>Recent Sessions</Typography>

        {sessions.length === 0 ? (
          <Typography>No sessions yet.</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sessions.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.module_code}</TableCell>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={s.status}
                      color={s.status === "OPEN" ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>{s.session_code}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => nav(`/lecturer/sessions/${s.id}/live`)}>
                      Live View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}
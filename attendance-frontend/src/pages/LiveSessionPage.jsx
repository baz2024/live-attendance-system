import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container, Paper, Typography, Stack, Button, Divider, Alert,
  Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import { apiFetch } from "../api/client";

export default function LiveSessionPage() {
  const { id } = useParams();
  const sessionId = Number(id);

  const [count, setCount] = useState(0);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");
  const [polling, setPolling] = useState(true);

  const timerRef = useRef(null);

  async function fetchLive() {
    const data = await apiFetch(`/api/attendance/live/${sessionId}`);
    setCount(data.count || 0);
    setAttendance(data.attendance || []);
  }

  useEffect(() => {
    setError("");
    fetchLive().catch((e) => setError(e.message));

    if (polling) {
      timerRef.current = setInterval(() => {
        fetchLive().catch((e) => setError(e.message));
      }, 4000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionId, polling]);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Live Attendance</Typography>

      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography><b>Session:</b> {sessionId}</Typography>
          <Typography><b>Count:</b> {count}</Typography>

          <Button variant="outlined" onClick={() => setPolling((p) => !p)}>
            {polling ? "Pause Polling" : "Resume Polling"}
          </Button>

          <Button variant="contained" onClick={() => fetchLive().catch((e) => setError(e.message))}>
            Refresh Now
          </Button>
        </Stack>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <Divider sx={{ my: 3 }} />

        {attendance.length === 0 ? (
          <Typography>No check-ins yet.</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Student No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Checked In At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((a, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{a.student_number}</TableCell>
                  <TableCell>{a.full_name}</TableCell>
                  <TableCell>{a.status}</TableCell>
                  <TableCell>{a.checked_in_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}
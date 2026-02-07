import { Container, Paper, Typography, Stack, Button } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function CheckInSuccess() {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const email = params.get("email") || "";
  const code = params.get("code") || "";

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h4">Checked In ✅</Typography>
          <Typography>Your attendance has been recorded successfully.</Typography>

          {email && <Typography><b>Email:</b> {email}</Typography>}
          {code && <Typography><b>Session Code:</b> {code}</Typography>}

          <Button variant="contained" onClick={() => nav("/student/checkin")}>
            Back to Check-in
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
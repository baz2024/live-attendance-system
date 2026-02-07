import { AppBar, Toolbar, Typography, Button, Stack, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useThemeMode } from "../theme/ThemeModeProvider";

export default function NavBar() {
  const { role, logout, isAuthed } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const nav = useNavigate();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Live Attendance
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {!isAuthed && (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}

          {isAuthed && role === "LECTURER" && (
            <Button color="inherit" component={RouterLink} to="/lecturer">
              Lecturer
            </Button>
          )}

          {isAuthed && (
            <Button color="inherit" component={RouterLink} to="/student/checkin">
              Student
            </Button>
          )}

          <IconButton color="inherit" onClick={toggleMode} aria-label="Toggle theme">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {isAuthed && (
            <Button
              color="inherit"
              onClick={() => {
                logout();
                nav("/login");
              }}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
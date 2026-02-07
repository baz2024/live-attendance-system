import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ThemeModeProvider } from "./theme/ThemeModeProvider";
import RegisterStudent from "./pages/RegisterStudent";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import LecturerHome from "./pages/LecturerHome";
import LiveSessionPage from "./pages/LiveSessionPage";
import StudentCheckIn from "./pages/StudentCheckIn";
import CheckInSuccess from "./pages/CheckInSuccess";

function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}

function RequireRole({ role, children }) {
  const { isAuthed, role: userRole } = useAuth();
  if (!isAuthed) return <Navigate to="/login" replace />;
  if (userRole !== role) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/lecturer"
              element={
                <RequireRole role="LECTURER">
                  <LecturerHome />
                </RequireRole>
              }
            />

            <Route
              path="/lecturer/sessions/:id/live"
              element={
                <RequireRole role="LECTURER">
                  <LiveSessionPage />
                </RequireRole>
              }
            />

            <Route
              path="/student/checkin"
              element={
                <RequireAuth>
                  <StudentCheckIn />
                </RequireAuth>
              }
            />

            <Route
              path="/success"
              element={
                <RequireAuth>
                  <CheckInSuccess />
                </RequireAuth>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/register/student" element={<RegisterStudent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeModeProvider>
  );
}
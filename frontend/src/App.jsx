import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Student pages (Dave)
import Login from './pages/student/Login';

// Must match the key Login.jsx uses in localStorage.setItem(...)
const AUTH_TOKEN_KEY = 'authToken';

// Temporary stubs — replaced by real pages in later tickets
const StudentDashboard = () => (
  <div style={{ padding: '20px' }}>Student Dashboard (coming in STU-FE-02)</div>
);

// Library page (Hertz replaces this stub)
const LibraryDashboard = () => <div>Library Dashboard (Hertz working on this)</div>;

// Reads the token at the moment the route renders, so login works without a page refresh.
// This only checks that a token exists. The backend must still verify it on every request.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route - everyone can access */}
        <Route path="/login" element={<Login />} />

        {/* Student Routes - require authentication */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Library Routes - Hertz completes this (add a ProtectedRoute guard then) */}
        <Route path="/library/dashboard" element={<LibraryDashboard />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all: unknown URLs go to login instead of a blank page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
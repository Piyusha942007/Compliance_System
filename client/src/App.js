import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// General Pages
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

import AttendancePage from './pages/AttendancePage';
import AccountsPage from './pages/AccountsPage';
import HostelPage from './pages/HostelPage';
import SubjectPage from './pages/SubjectPage';

// Renamed to avoid clash
import TeacherHomeDashboard from "./pages/TeacherHomeDashboard";
import AdminHomeDashboard from "./pages/AdminHomeDashboard";

// Compliance Module Pages
import {
  StudentDashboard,
  TeacherDashboard as ComplianceTeacherDashboard, // ✅ Renamed here
  TeacherSubjectSelect
} from "./compliance/ComplianceMain";

function App() {
  return (
    <Router>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/hostel" element={<HostelPage />} />
        <Route path="/subjects" element={<SubjectPage />} />

        {/* Compliance Routes */}
        <Route path="/compliance/student" element={<StudentDashboard />} />
        <Route path="/compliance/teacher" element={<TeacherSubjectSelect />} />
        <Route path="/compliance/teacher/:subject" element={<ComplianceTeacherDashboard />} /> {/* ✅ Updated name */}
        <Route path="/compliance/student/:email/:subject" element={<StudentDashboard />} />
     

        {/* Dashboards */}
        <Route path="/student/dashboard" element={<DashboardPage />} />
        <Route path="/teacher/dashboard" element={<TeacherHomeDashboard />} />
        <Route path="/admin/dashboard" element={<AdminHomeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;








import react from "react";
import { useNavigate } from "react-router-dom";

const teacherModules = [
  { name: "Mark Attendance", icon: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", route: "/mark-attendance" },
  { name: "Compliance Check", icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png", route: "/compliance/teacher" },
  { name: "Upload Marks", icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", route: "/upload-marks" },
  { name: "Time Table", icon: "https://cdn-icons-png.flaticon.com/512/747/747310.png", route: "/teacher-timetable" }
];

export default function TeacherHomeDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div style={{ fontFamily: "Segoe UI", background: "#f5f7fa", minHeight: "100vh" }}>
      <header style={{
        background: "#fff",
        padding: "15px 30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <h2 style={{ color: "#2c3e50" }}>Welcome, {user.name || "Teacher"}</h2>
        <span style={{
          padding: "4px 12px",
          background: "#d4fcdc",
          color: "green",
          borderRadius: "12px"
        }}>
          🟢 Active
        </span>
      </header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "30px",
        padding: "40px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {teacherModules.map((mod, idx) => (
          <div
            key={idx}
            onClick={() => navigate(mod.route)}
            style={{
              background: "linear-gradient(to bottom, #eaf0fb, #ffffff)",
              borderRadius: "15px",
              textAlign: "center",
              padding: "30px 20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img
              src={mod.icon}
              alt={mod.name}
              style={{ width: 50, height: 50, marginBottom: 15 }}
            />
            <p style={{ fontWeight: "500", fontSize: 15 }}>{mod.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}




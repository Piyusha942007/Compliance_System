import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const modules = [
  { name: "Account", icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png", route: "/accounts" },
  { name: "Attendance", icon: "https://cdn-icons-png.flaticon.com/512/3125/3125856.png", route: "/attendance" },
  { name: "Feedback", icon: "https://cdn-icons-png.flaticon.com/512/2462/2462719.png", route: "/feedback" },
  { name: "Hostel", icon: "https://cdn-icons-png.flaticon.com/512/1398/1398478.png", route: "/hostel" },
  { name: "My Time Table", icon: "https://cdn-icons-png.flaticon.com/512/747/747310.png", route: "/timetable" },
  { name: "Notification", icon: "https://cdn-icons-png.flaticon.com/512/786/786453.png", route: "/notifications" },
  { name: "Project Monitoring", icon: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png", route: "/projects" },
  { name: "Quiz", icon: "https://cdn-icons-png.flaticon.com/512/4241/4241273.png", route: "/quiz" },
  { name: "Subject Registration", icon: "https://cdn-icons-png.flaticon.com/512/18725/18725147.png", route: "/subjects" },
  {
    name: "Compliance",
    icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
    route: "/compliance/student"
  },
];

export default function DashboardPage() {
  const [name, setName] = useState("Student");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setName(parsedUser.name || "Student");
    }
  }, []);

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
      <header style={{
  background: "#f0f2f5",
  width: "100vw",  // Use full viewport width
  padding: "15px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  position: "sticky",
  top: 0,
  zIndex: 10
}}>
        <div style={{
          
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          {/* Left Section */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 15 }}>
            <img
              src="https://pccoebucket.s3.ap-south-1.amazonaws.com/logo/pcet_logo_new1.jpg"
              alt="Logo"
              style={{ height: 50 }}
            />
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#2c3e50" }}>
              Pimpri Chinchwad College of Engineering and Research
            </div>
          </div>

          {/* Right Section */}
          <div style={{ display: "flex", alignItems: "center", gap: 15, flexWrap: "wrap" }}>
            <span style={{
              padding: "4px 10px",
              background: "#d4fcdc",
              color: "green",
              borderRadius: 12,
              fontSize: 12
            }}>🟢 Active</span>
            <strong>{name}</strong>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User"
              style={{ height: 40, width: 40, borderRadius: "50%" }}
            />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div style={{ textAlign: "center", margin: "30px auto", maxWidth: "600px" }}>
        <input
          type="text"
          placeholder="Search Module"
          style={{
            width: "100%",
            padding: "10px 15px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px"
          }}
        />
      </div>

      {/* Modules Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "30px",
        padding: "0 40px 40px",
        maxWidth: "1300px",
        margin: "0 auto"
      }}>
        {modules.map((mod, idx) => (
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
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img src={mod.icon} alt={mod.name} style={{ width: 50, height: 50, marginBottom: 15 }} />
            <p style={{ fontWeight: "500", fontSize: 15 }}>{mod.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}













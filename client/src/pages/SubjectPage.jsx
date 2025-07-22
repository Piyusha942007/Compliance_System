import React from "react";
import { useNavigate } from "react-router-dom";

export default function SubjectRegPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{
        background: "#ffffff",
        padding: "15px 30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <img
            src="https://pccoebucket.s3.ap-south-1.amazonaws.com/logo/pcet_logo_new1.jpg"
            alt="Logo"
            style={{ height: 45 }}
          />
          <h2 style={{ margin: 0, fontSize: 20, color: "#2c3e50" }}>Subject Registration</h2>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "8px 16px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px", boxSizing: "border-box" }}>
        <div style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          textAlign: "center"
        }}>
          <h3 style={{ marginBottom: 20 }}>📚 Choose Your Subjects</h3>
          <p style={{ fontSize: 16, color: "#555" }}>
            This module will allow students to register their elective and core subjects for the upcoming semester. You can integrate subject lists and eligibility checks later.
          </p>
        </div>
      </div>
    </div>
  );
}


import React from "react";

export default function AccountsPage() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{
        width: "100%",
        background: "#ffffff",
        padding: "15px 30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "20px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxSizing: "border-box"
      }}>
        <img
          src="https://pccoebucket.s3.ap-south-1.amazonaws.com/logo/pcet_logo_new1.jpg"
          alt="Logo"
          style={{ height: 50 }}
        />
        <h2 style={{
          fontSize: "22px",
          color: "#2c3e50",
          margin: 0,
          whiteSpace: "nowrap"
        }}>
          Accounts Module
        </h2>
        <div style={{ flexGrow: 1 }} /> {/* pushes right if anything later */}
      </header>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
        <div style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          textAlign: "center"
        }}>
          <h3 style={{ marginBottom: 20 }}>💼 Account Summary</h3>
          <p style={{ fontSize: 16, color: "#555" }}>
            This section will display your fee details, transaction history, and any outstanding dues.
            You can customize it later to fetch data from the database.
          </p>
        </div>
      </div>
    </div>
  );
}









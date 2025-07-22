import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", formData);

    const user = res.data.user;
    const token = res.data.token;

    // ✅ Save token and user
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ PERMANENT FIX: Save student email for compliance
    localStorage.setItem("studentEmail", user.email);

    alert(res.data.message || "Login successful!");

    // Redirect
    if (user.role === "teacher") {
      navigate("/teacher/dashboard");
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      localStorage.setItem("studentEmail", user.email);
      navigate("/student/dashboard");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f5f5f5',
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            marginTop: "15px",
            cursor: "pointer"
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}







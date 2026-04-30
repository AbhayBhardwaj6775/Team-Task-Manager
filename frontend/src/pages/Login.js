import { useState } from "react";
import "../App.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const login = async () => {
    if (!form.email || !form.password) {
      return alert("Enter email and password");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!data.token) {
        return alert(data.msg || "Login failed");
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Redirect
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={login}>Login</button>

        {/* 🔥 Signup Link */}
        <p style={{ marginTop: "10px" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#4f46e5", cursor: "pointer" }}
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
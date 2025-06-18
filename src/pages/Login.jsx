import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Disha02" && password === "Unloadin@123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/orders");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin} autoComplete="off">
        <h2 style={styles.heading}>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    minWidth: "300px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#060447",
  },
  input: {
    marginBottom: "16px",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    backgroundColor: "#060447",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Login;

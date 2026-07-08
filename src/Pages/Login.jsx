import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login: setAuthToken } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(form);
      setAuthToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed.");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/todoApi";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      alert("Registration failed.");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

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

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
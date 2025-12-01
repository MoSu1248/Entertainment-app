import React, { useState } from "react";
import { useLoginStore } from "../../components/Store/LoginStore"; // adjust path
import { useNavigate } from "react-router";

export default function LoginContainer({ register }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLoginStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.find(
      (u) => u.email === email && u.password === password
    );

    if (userExists) {
      login({ email });
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Login to your account
        </button>
      </form>
      <div className="footer">
        <p>Don’t have an account?</p>
        <span onClick={register}>Sign Up</span>
      </div>
    </div>
  );
}

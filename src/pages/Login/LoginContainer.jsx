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
      (u) => u.email === email && u.password === password,
    );

    if (userExists) {
      login({ email });
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGuest = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setEmail("Guest");
    setPassword("Guest");
    users.push({ email, password });
    login({ email });
    navigate("/");
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
      <div className="container-footer ">
        <p>
          Don’t have an account?<span onClick={register}>Sign Up</span>
        </p>
      </div>
      <div className="container-footer ">
        <p>Or </p>
      </div>
      <div className="container-footer ">
        <p>
          Continue as a<span onClick={handleGuest}>Guest</span>
        </p>
      </div>
    </div>
  );
}

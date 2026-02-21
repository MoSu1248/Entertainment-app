import React, { useState } from "react";
import { useLoginStore } from "../../components/Store/LoginStore";
import { useNavigate } from "react-router-dom";

export default function Register({ register }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const login = useLoginStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      alert("Email already registered");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    login({ email });
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Email Address"
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
        <input
          className="input"
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Create an account
        </button>
      </form>
      <div className="container-footer ">
        <p>Already have an account?</p>
        <span onClick={register}>Login</span>
      </div>{" "}
      
    </div>
  );
}

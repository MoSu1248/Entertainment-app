import React, { useState } from "react";
import "./Login.scss";
import LoginContainer from "./LoginContainer";
import Register from "./RegisterContainer";
import Logo from "../../assets/logo.svg?react";

export default function Login() {
  const [register, setRegister] = useState(false);

  return (
    <>
      <div className="login">
        <Logo className="logo" />
        {register ? (
          <Register
            register={() => {
              setRegister(false);
            }}
          />
        ) : (
          <LoginContainer
            register={() => {
              setRegister(true);
            }}
          />
        )}
      </div>
    </>
  );
}

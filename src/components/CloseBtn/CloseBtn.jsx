import React from "react";
import "./CloseBtn.scss";
import CloseIcon from "../../assets/icon-close.svg?react";
import { useNavigate } from "react-router-dom";

export default function CloseBtn() {
  const navigate = useNavigate();
  const element = document.querySelector("body");

  function handleClose() {
    element.style.overflowY = "visible";
    navigate(-1);
  }

  return (
    <button onClick={() => handleClose()} className="close__btn">
      <CloseIcon />
    </button>
  );
}

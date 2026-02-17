import React from "react";
import "./CloseBtn.scss";
import CloseIcon from "../../assets/icon-close.svg?react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CloseBtn() {
  const navigate = useNavigate();
  const element = document.querySelector("body");
  const location = useLocation();
  const backgroundLocation = location.state?.background;
 

  function handleClose() {
    document.body.style.overflowY = "auto";
    if (backgroundLocation) {
      navigate(backgroundLocation.pathname, {
        replace: true,
        state: {},
      });
    } else {
      navigate(-1);
    }
  }

  return (
    <button onClick={() => handleClose()} className="close__btn">
      <CloseIcon />
    </button>
  );
}

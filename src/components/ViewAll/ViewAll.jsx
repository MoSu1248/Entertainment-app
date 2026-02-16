import React from "react";
import "./ViewAll.scss";
import Arrow from "../../assets/arrow_icon.svg?react";

export default function ViewAll({ setNumber }) {
  return (
    <div className="viewMore__container">
      <button
        onClick={() => setNumber((prev) => prev + 1)}
        className="viewMore__btn"
      >
        <Arrow />
      </button>
      <div className="viewMore__line"></div>
    </div>
  );
}

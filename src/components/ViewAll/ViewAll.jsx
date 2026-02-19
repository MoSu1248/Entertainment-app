import React from "react";
import "./ViewAll.scss";
import Arrow from "../../assets/arrow_icon.svg?react";

export default function ViewAll({
  setNumber,
  setSimilarNumber,
  similarnumber,
}) {
  return (
    <div className="viewMore__container">
      <button
        onClick={() => {
          similarnumber
            ? setSimilarNumber((prev) => prev + 6)
            : setNumber((prev) => prev + 1);
        }}
        className="viewMore__btn"
      >
        <Arrow />
      </button>
      <div className="viewMore__line"></div>
    </div>
  );
}

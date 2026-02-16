import React from "react";
import "./SkeletonLoader.scss";

export default function SkeletonLoader() {
  return (
    <div className="skeleton__card">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
    </div>
  );
}

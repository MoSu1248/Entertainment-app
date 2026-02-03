import React from "react";
import "./Popup.scss";
import { useLoginStore } from "../Store/LoginStore";
import { useOverlayStore } from "../Store/useOverlayStore";

export default function Popup() {
  const logout = useLoginStore((state) => state.logout);
  const hideLogout = useOverlayStore((state) => state.hideLogout);

  function handleLogout() {
    logout();
    hideLogout();
  }

  return (
    <div className="popup__wrapper">
      <div className="popup__container">
        <h2>Logout?</h2>
        <div className="button__container">
          <button onClick={() => handleLogout()}>Confirm</button>
          <button className="cancel" onClick={hideLogout}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

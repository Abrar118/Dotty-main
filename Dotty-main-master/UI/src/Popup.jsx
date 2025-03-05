import React from "react";
import "./Popup.css";
import { Fireworks } from "fireworks/lib/react";

const Popup = ({ isOpen, winner, onClose }) => {
  const fxProps = {
    count: 3,
    interval: 100,
    colors: ["#3a34eb", "#9e34eb", "#34ebe5"],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 5) - (i + 1) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
    }),
  };
  if (!isOpen) return null;
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <Fireworks {...fxProps} />
        <h2 className="popup-title">Congratulations!!!</h2>
        <p className="popup-message">{winner} has won!</p>
        <button className="popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;

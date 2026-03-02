import React, { useState } from "react";
import car from "./assets/car.png";
import "./index.css";

const CarAnimation: React.FC = () => {
  const [moving, setMoving] = useState(false);
  const [reverse, setReverse] = useState(false);

  const toggleMove = () => {
    setMoving(!moving);
  };

  const toggleDirection = () => {
    setReverse(!reverse);
  };

  return (
    <div className="car-container">
      <h2>Car Animation</h2>

      <div className="road">
        <img
          src={car}
          alt="car"
          className={`car ${moving ? (reverse ? "move-reverse" : "move") : ""}`}
        />
      </div>

      <div className="controls">
        <button className="start-btn" onClick={toggleMove}>
          {moving ? "Stop Car" : "Start Car"}
        </button>
        <button className="direction-btn" onClick={toggleDirection}>
          {reverse ? "Go Forward" : "Go Backward"}
        </button>
      </div>
    </div>
  );
};

export default CarAnimation;


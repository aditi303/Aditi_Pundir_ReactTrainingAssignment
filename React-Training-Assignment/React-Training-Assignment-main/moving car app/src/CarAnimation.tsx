import React, { useState } from "react";
import car from "./assets/car.png";
import "./index.css";

interface CarState {
  moving: boolean;
  reverse: boolean;
}

const CarAnimation: React.FC = () => {
  const [carState, setCarState] = useState<CarState>({ moving: false, reverse: false });

  const toggleMove = (): void => {
    setCarState(prev => ({ ...prev, moving: !prev.moving }));
  };

  const toggleDirection = (): void => {
    setCarState(prev => ({ ...prev, reverse: !prev.reverse }));
  };

  const getCarClassName = (): string => {
    const { moving, reverse } = carState;
    const baseClass = "car";
    const animationClass = moving ? (reverse ? "move-reverse" : "move") : "";
    return `${baseClass} ${animationClass}`.trim();
  };

  return (
    <div className="car-container">
      <h2>Car Animation</h2>

      <div className="road">
        <img
          src={car}
          alt="Car animation"
          className={getCarClassName()}
        />
      </div>

      <div className="controls">
        <button className="start-btn" onClick={toggleMove} aria-label={carState.moving ? "Stop the car" : "Start the car"}>
          {carState.moving ? "Stop Car" : "Start Car"}
        </button>
        <button className="direction-btn" onClick={toggleDirection} aria-label={carState.reverse ? "Move car forward" : "Move car backward"}>
          {carState.reverse ? "Go Forward" : "Go Backward"}
        </button>
      </div>
    </div>
  );
};

export default CarAnimation;
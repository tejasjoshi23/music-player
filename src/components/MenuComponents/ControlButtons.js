import React, { useState } from "react";
import "../../css/ControlButtons.css";

const ControlButtons = ({ onForYou, onTopTracks }) => {
  const [activeButton, setActiveButton] = useState("ForYou");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "ForYou") {
      onForYou();
    } else if (buttonName === "TopTracks") {
      onTopTracks();
    }
  };

  return (
    <div className="list-controls">
      <button
        className={activeButton === "ForYou" ? "active" : ""}
        onClick={() => handleButtonClick("ForYou")}
      >
        For You
      </button>
      <button
        className={activeButton === "TopTracks" ? "active" : ""}
        onClick={() => handleButtonClick("TopTracks")}
      >
        Top Tracks
      </button>
    </div>
  );
};

export default ControlButtons;

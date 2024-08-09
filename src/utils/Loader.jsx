import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import '../App.css';
const Loader = () => {
  return (
    <div className="loader-container">
      <ScaleLoader color="#ffffff" />
    </div>
  );
};

export default Loader;

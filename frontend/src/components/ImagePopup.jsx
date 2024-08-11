import React, { useState } from "react";
import "../image.css";
import useTypewriter from "../hooks/useTypewriter";
const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return <p>{displayText}</p>;
};

const ImagePopup = ({ isVisible, setIsVisible }) => {
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div id="cloud">
        <span class="shadow"></span>
        <div class="middle-circle"></div>
        <div
          class="cloud-text"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typewriter text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          <button onClick={handleButtonClick}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ImagePopup;

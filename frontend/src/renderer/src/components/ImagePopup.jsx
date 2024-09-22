import React, { useState } from "react";
import "../image.css";
import useTypewriter from "../hooks/useTypewriter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return <p>{displayText}</p>;
};

const ImagePopup = ({
  isVisible,
  setIsVisible,
  sendNotification,
  onClick,
  text,
}) => {
  const handleButtonClick = () => {
    setIsVisible(!isVisible);
    sendNotification();
    toast("You will receive Notifications when prices are optimal.", {
      type: "success",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div id="cloud">
        <span class="shadow"></span>
        <div class="middle-circle"></div>
        <div
          class="cloud-text"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typewriter
            text={
              text ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
          />
          <div>
            <button onClick={onClick || handleButtonClick}>
              {onClick ? "Close" : "Send Notification"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePopup;

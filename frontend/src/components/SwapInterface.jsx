import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import ImagePopup from "./ImagePopup";
import "../image.css";

const SwapInterface = () => {
  const navigate = useNavigate();
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: false },
    { name: "Swap", href: "/SwapInterface", current: true },
    { name: "Predict", href: "/predict", current: false },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputNumber, setInputNumber] = useState(0);
  console.log(open);
  const handleNumberChange = (event) => {
    setInputNumber(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("clicked");
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <NavigationBar navigation={navigation} />
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Swap</h2>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Token</label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <select className="bg-slate-700 border-none text-white focus:outline-none flex-shrink-0">
                <option>ETH</option>
                <option>BTC</option>
              </select>
              <input
                type="number"
                className="bg-transparent border-none text-right text-white flex-grow focus:outline-none"
                placeholder="0"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              You receive
            </label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <select className="bg-slate-700 border-none text-white focus:outline-none flex-shrink-0">
                <option>Select token</option>
                <option>BTC</option>
                <option>USDT</option>
              </select>
              <input
                type="number"
                className="bg-transparent border-none text-right w-[100%] text-white focus:outline-none"
                placeholder="0"
                value={inputNumber}
                readOnly
              />
            </div>
          </div>
          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition duration-300"
            onClick={() => handleButtonClick()}
          >
            Swap
          </button>
        </div>
      </div>
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          style={{ outline: "2px solid red" }}
        >
          <div className="relative flex sm:flex-row flex-col items-center">
            <ImagePopup isVisible={isVisible} setIsVisible={setIsVisible} />
            <div>
              <div
                className="bg-white rounded-full absolute"
                id="circular1"
              ></div>
              <div
                className="bg-white rounded-full absolute"
                id="circular2"
              ></div>

              <div
                className="bg-white rounded-full absolute"
                id="circular3"
              ></div>

              <img src="/alfred2.png" id="alfred" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapInterface;

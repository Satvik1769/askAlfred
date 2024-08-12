import ImagePopup from "./ImagePopup";
import NavigationBar from "./NavigationBar";
import { useState } from "react";
import "../image.css";

export default function Predict() {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "#", current: false },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: true },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar navigation={navigation} />
      <div className="flex justify-center items-center mt-40">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Predict</label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <select className="bg-slate-700 border-none text-white focus:outline-none flex-shrink-0">
                <option>ETH</option>
                <option>BTC</option>
              </select>
              <input
                type="number"
                className="bg-transparent border-none text-right text-white flex-grow focus:outline-none"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition duration-300"
            onClick={handleButtonClick}
          >
            Predict
          </button>
        </div>
      </div>
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          style={{ outline: "2px solid red" }}
        >
          <div className="relative flex items-center">
            <ImagePopup isVisible={isVisible} setIsVisible={setIsVisible} />

            {/* White Circular Divs */}
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

            <img src="/alfred2.png" style={{ height: "550px" }} />
          </div>
        </div>
      )}
    </div>
  );
}

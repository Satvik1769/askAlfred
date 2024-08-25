import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import ImagePopup from "./ImagePopup";
import "../image.css";
import { useName } from "../Context/NameContext";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const SwapInterface = () => {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: false },
    { name: "Swap", href: "/SwapInterface", current: true },
    { name: "Predict", href: "/predict", current: false },
    { name: "Notifications", href: "/notifications", current: false },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputNumber, setInputNumber] = useState(0);
  const { address } = useWeb3ModalAccount();

  const { isConnected } = useWeb3ModalAccount();
  const {
    isModalVisible,
    showModal,
    hideModal,
    handleInputChanges,
    handleSubmitName,
  } = useName();
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        try {
          console.log(isConnected);

          const response = await fetch(
            `http://localhost:3001/name/${address}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          console.log(data);
          if (response.status === 404) {
            showModal();
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        hideModal();
        console.log("Modal Visibility:" + isModalVisible);
      }
    };

    fetchData();
  }, [isConnected, address]);

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
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-lg font-semibold mb-4">
              What should I call you Master
            </h3>
            <input
              type="text"
              onChange={handleInputChanges}
              className="border border-gray-300 bg-slate-700 p-2 text-white rounded-md w-full"
              placeholder="Enter your name"
            />
            <button
              onClick={handleSubmitName}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapInterface;

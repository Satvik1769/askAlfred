import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const SwapInterface = () => {
  const navigate = useNavigate();
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "#", current: false },
    { name: "Swap", href: "/SwapInterface", current: true },
    { name: "Predict", href: "#", current: false },
  ];

  return (
    <div className="relative">
      <NavigationBar navigation={navigation} />
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Swap</h2>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-gray-700 rounded">Swap</button>
              <button className="px-2 py-1 bg-gray-700 rounded">Limit</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm">You pay</label>
            <div className="flex items-center bg-gray-700 p-2 rounded mt-1">
              <select className="bg-transparent border-none text-white focus:outline-none">
                <option>ETH</option>
                <option>BTC</option>
              </select>
              <input
                type="number"
                className="bg-transparent border-none text-right text-white flex-grow focus:outline-none"
                value="0.000000"
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm">You receive</label>
            <div className="flex items-center bg-gray-700 p-2 rounded mt-1">
              <select className="bg-transparent border-none text-white focus:outline-none">
                <option>Select a token</option>
                <option>BTC</option>
                <option>USDT</option>
              </select>
              <input
                type="number"
                className="bg-transparent border-none text-right text-white flex-grow focus:outline-none"
                value="0"
                readOnly
              />
            </div>
          </div>
          <button className="w-full py-2 bg-blue-600 rounded mt-2">Swap</button>
        </div>
      </div>
    </div>
  );
};

export default SwapInterface;

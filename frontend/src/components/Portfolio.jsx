import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

function Portfolio() {
  const navigate = useNavigate();
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: true },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: false },
    { name: "Notifications", href: "/notifications", current: false },
  ];

  return (
    <div className="relative">
      <NavigationBar navigation={navigation} />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-8">
          <header className="flex justify-center items-center border-b border-gray-700 pb-4">
            <h2 className="text-4xl font-bold tracking-wide text-center animate-fade-in">
              Your Portfolio
            </h2>
          </header>

          <div className="mt-10 bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-center text-blue-400">
              Decentralized accounts
            </h3>
            <div className="flex flex-col items-center mt-6 space-y-2">
              <p className="text-5xl font-bold text-white-400">$0.00</p>
              <span className="text-lg text-gray-400">(0.00%)</span>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <span className="text-blue-200 bg-gray-700 px-3 py-1 rounded-full text-sm">
                0xD019...f9B63C
              </span>
              <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transform transition duration-300">
                6 Networks
              </button>
              <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transform transition duration-300">
                More
              </button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400">Tokens</h3>
              <p className="mt-6 text-gray-400">No Tokens to Show</p>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300">
                Buy Tokens
              </button>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400">NFTs</h3>
              <p className="mt-6 text-gray-400">No NFTs to Show</p>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300">
                Explore NFTs
              </button>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-700">
              <h3 className="text-2xl font-semibold text-blue-400">DeFi</h3>
              <p className="mt-6 text-gray-400">No DeFi positions</p>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300">
                View DeFi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;

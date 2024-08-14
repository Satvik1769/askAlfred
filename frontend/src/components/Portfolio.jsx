import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";


function App() {
  const navigate = useNavigate();
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: false },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: true },
  ];

  return (
    <div className="relative">
      <NavigationBar navigation={navigation} />

      <div className="min-h-screen bg-gray-900 text-white flex items-centre">
=======
function Portfolio() {
    const navigate = useNavigate();

    const navigation = [
        { name: "Home", href: "/", current: false },
        { name: "Portfolio", href: "Portfolio", current: false },
        { name: "Swap", href: "/SwapInterface", current: true },
        { name: "Predict", href: "/predict", current: false },
      ];
    
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-centre">

        <div className="ml-64 w-full p-8">
          <header className="flex justify-between items-center border-b border-gray-700 pb-4">
            <h2 className="text-3xl font-bold">Your Portfolio</h2>
          </header>

          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Decentralized accounts</h3>
            <div className="flex items-center mt-4">
              <p className="text-4xl font-bold">$0.00</p>
              <span className="text-sm text-gray-400 ml-4">(0.00%)</span>
            </div>
            <div className="flex items-center mt-2 space-x-3">
              <span>0xD019...f9B63C</span>
              <button className="bg-gray-700 text-gray-300 px-2 py-1 rounded-lg">
                6 Networks
              </button>
              <button className="bg-gray-700 text-gray-300 px-2 py-1 rounded-lg">
                More
              </button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Tokens</h3>
              <p className="mt-4">No Tokens to Show</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Buy Tokens
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold">NFTs</h3>
              <p className="mt-4">No NFTs to Show</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Explore NFTs
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold">DeFi</h3>
              <p className="mt-4">No DeFi positions</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                View DeFi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
=======
export default Portfolio;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const SwapInterface = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <NavigationBar />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Swap</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition duration-300">Swap</button>
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition duration-300">Limit</button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">You pay</label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <select className="bg-transparent border-none text-white focus:outline-none flex-shrink-0">
                <option>ETH</option>
                <option>BTC</option>
              </select>
              <input type="number" className="bg-transparent border-none text-right text-white flex-grow focus:outline-none" value="0.000000" readOnly />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">You receive</label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <select className="bg-transparent border-none text-white focus:outline-none flex-shrink-0">
                <option>Select a token</option>
                <option>BTC</option>
                <option>USDT</option>
              </select>
              <input type="number" className="bg-transparent border-none text-right text-white flex-grow focus:outline-none" value="0" readOnly />
            </div>
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition duration-300">Swap</button>
        </div>
      </div>
    </div>
  );
};

export default SwapInterface;


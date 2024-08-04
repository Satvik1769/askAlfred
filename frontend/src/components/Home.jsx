import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const connectWallet = () => {
    alert("Connect Wallet functionality will be implemented here.");
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <button 
        className="absolute top-4 right-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded shadow-lg transform hover:scale-105 transition-transform duration-300"
        onClick={() => navigate('/login')}
      >
        Login / Signup
      </button>
      <h1 className="text-5xl font-bold mb-16">Welcome to the Token Swap App</h1>
      <div className="flex flex-col space-y-6">
        <button 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded shadow-lg transform hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/prediction')}
        >
          Prediction for Token Price
        </button>
        <button 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded shadow-lg transform hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/better-swap')}
        >
          Predicting Better Token for Swapping
        </button>
        <button 
          className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded shadow-lg transform hover:scale-105 transition-transform duration-300"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Home;






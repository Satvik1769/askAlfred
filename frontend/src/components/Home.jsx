import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const Home = () => {
  const navigate = useNavigate();

  const connectWallet = () => {
    alert("Connect Wallet functionality will be implemented here.");
  };

  return (
   <div>
    <NavigationBar/>
    <div className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
    </div>
   </div>
  );
};

export default Home;






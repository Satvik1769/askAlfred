import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const Home = () => {
  const navigate = useNavigate();

  return (
   <div className='relative'>
    <NavigationBar/>
    <div className="relative flex h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
  <div className="flex flex-col md:flex-row justify-center w-full outline-black outline-2" style={{ height: '600px' }}>
    <div className="flex flex-col justify-center w-full md:w-1/3 sm:w-3/4 h-500 p-5 md:ml-6 outline-black outline-2 animate-fadeInLeft">
      <h1 className="text-xl font-bold sm:text-4xl">Become Bruce Wayne with Alfred,</h1>
      <h1 className="text-xl font-bold sm:text-4xl my-1">Your Crypto-Savvy Butler!</h1>
      <p>Meet Alfred, your wise and sophisticated butler, here to guide you through the bustling world of cryptocurrencies. With askAlfred, leverage the power of advanced AI to predict the best moments to swap your tokens, turning your crypto portfolio into a fortune fit for a billionaire!</p>
    </div>
    <img src="/alfred2.png" alt="Alfred the butler" className="h-550 animate-fadeInRight" />
  </div>
</div>

   </div>
  );
};

export default Home;






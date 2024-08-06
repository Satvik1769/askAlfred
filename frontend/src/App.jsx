import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SwapInterface from './components/SwapInterface';
import LoginSignup from './components/LoginSignup';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = '706c0e5d6907e805a993314784e2c63d'

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const metadata = {
  name: 'askAlfred',
  description: 'Meet Alfred your very own wise butler who will help you in finding the tokens that are going to make you Bruce Wayne.',
  url: 'https://localhost:5173', 
  icons: ['https://localhost:5173/cropped_image.png']
}

const ethersConfig = defaultConfig({
  metadata,

  enableEIP6963: true, 
  enableInjected: true, 
  enableCoinbase: true, 
  rpcUrl: 'https://cloudflare-eth.com', 
  defaultChainId: 1 
})

createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true 
})



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<SwapInterface />} />
        <Route path="/SwapInterface" element={<SwapInterface />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
};

export default App;




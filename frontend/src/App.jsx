import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SwapInterface from "./components/SwapInterface";
import LoginSignup from "./components/LoginSignup";
import Predict from "./components/Predict";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const projectId = "706c0e5d6907e805a993314784e2c63d";

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const bnbChain = {
  chainId: 56,
  name: "Binance Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc-dataseed.binance.org/",
};

const avalancheChain = {
  chainId: 43114,
  name: "Avalanche",
  currency: "AVAX",
  explorerUrl: "https://snowtrace.io",
  rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
};

const optimismChain = {
  chainId: 10,
  name: "Optimism",
  currency: "ETH",
  explorerUrl: "https://optimistic.etherscan.io",
  rpcUrl: "https://mainnet.optimism.io",
};

const polygonChain = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://rpc-mainnet.maticvigil.com",
};

const metadata = {
  name: "askAlfred",
  description:
    "Meet Alfred your very own wise butler who will help you in finding the tokens that are going to make you Bruce Wayne.",
  url: "https://localhost:5173",
  icons: ["https://localhost:5173/cropped_image.png"],
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: "https://cloudflare-eth.com",
  defaultChainId: 1,
});

createWeb3Modal({
  ethersConfig,
  chains: [mainnet, bnbChain, avalancheChain, optimismChain, polygonChain],
  projectId,
  enableAnalytics: true,
});

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/SwapInterface" element={<SwapInterface />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
};

export default App;

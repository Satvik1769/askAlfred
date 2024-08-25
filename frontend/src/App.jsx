import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SwapInterface from "./components/SwapInterface";
import LoginSignup from "./components/LoginSignup";
import Predict from "./components/Predict";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import Portfolio from "./components/Portfolio";
import Testing from "./components/Testing";
import { initWeb3InboxClient } from "@web3inbox/react";
import NotificationPage from "./components/NotificationPage";
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./Context/NotificationContext";
import { NameProvider } from "./Context/NameContext";

const projectId = import.meta.env.VITE_APP_KIT_PROJECT_ID;
const appDomain = import.meta.env.VITE_PUBLIC_APP_DOMAIN;

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
  url: appDomain,
  icons: ["https://ask-alfred.vercel.app/cropped_image.png"],
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

initWeb3InboxClient({
  projectId,
  domain: appDomain,
  allApps: true,
});

const App = () => {
  return (
    <NotificationProvider>
      <NameProvider>    

    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/SwapInterface" element={<SwapInterface />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Routes>
      </div>
    </Router>
    </NameProvider>
    </NotificationProvider>

  );
};

export default App;

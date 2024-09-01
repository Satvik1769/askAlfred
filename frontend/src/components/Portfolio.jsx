import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useState, useEffect } from "react";
import { useName } from "../Context/NameContext";
import ImagePopup from "./ImagePopup";
import Moralis from 'moralis';

try {
  await Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImU3N2FkNGM4LWVlYjYtNGM5Yi1iMTVmLTQyYjliMWZjNGZlNSIsIm9yZ0lkIjoiNDAwODQyIiwidXNlcklkIjoiNDExODg3IiwidHlwZUlkIjoiOTcyODZkYzYtMDkyZi00OTAwLWFmNGEtZTdjODM1ZGYxMzNjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjE1NDA4ODksImV4cCI6NDg3NzMwMDg4OX0.OQKPvICBuOK_wuidY_ikmVVfN8Pd94u4qz9xVbFC5IQ"
  });

  const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
    "chain": "0x1",
    "order": "DESC",
    "address": "0xD0193d86523981c46F0Df8B35B11456b49f9B63C"
  });

  console.log(response.raw);
} catch (e) {
  console.error(e);
}

import Moralis from 'moralis';

try {
  await Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImU3N2FkNGM4LWVlYjYtNGM5Yi1iMTVmLTQyYjliMWZjNGZlNSIsIm9yZ0lkIjoiNDAwODQyIiwidXNlcklkIjoiNDExODg3IiwidHlwZUlkIjoiOTcyODZkYzYtMDkyZi00OTAwLWFmNGEtZTdjODM1ZGYxMzNjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjE1NDA4ODksImV4cCI6NDg3NzMwMDg4OX0.OQKPvICBuOK_wuidY_ikmVVfN8Pd94u4qz9xVbFC5IQ"
  });

  const response = await Moralis.EvmApi.balance.getNativeBalance({
    "chain": "0x1",
    "address": "0xD0193d86523981c46F0Df8B35B11456b49f9B63C"
  });

  console.log(response.raw);
} catch (e) {
  console.error(e);
}


function Portfolio() {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: true },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: false },
    { name: "Notifications", href: "/notifications", current: false },
  ];
  const { isConnected } = useWeb3ModalAccount();
  console.log(isConnected);
  const [isVisible, setIsVisible] = useState(false);
  const { address } = useWeb3ModalAccount();
  const {
    isModalVisible,
    isPopupVisible,
    showModal,
    hideModal,
    handleInputChanges,
    handleSubmitName,
    hidePopupVisible,
    inputName,
  } = useName();
  const scheduleNotification = async () => {
    await handleSendNotification({
      account: `eip155:1:${address}`,
      notification: {
        title: "Lord Save India!",
        body: "This is a test for delhi",
        icon: `https://ask-alfred.vercel.app/cropped_image.png`,
        url: "https://ask-alfred.vercel.app",
        friendly_type: "Manual",
        type: "5ad4b32a-4dc5-48e3-bba6-6c78b243220a",
      },
    });
    console.log("Notification scheduled");
  };
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        try {
          console.log(isConnected);

          const response = await fetch(
            `http://localhost:3001/name/${address}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          console.log(data);
          if (response.status === 404) {
            showModal();
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        hideModal();
        console.log("Modal Visibility:" + isModalVisible);
      }
    };

    fetchData();
  }, [isConnected, address]);

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
              <p className="text-5xl font-bold text-white-400">
                $0.00
              </p>
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
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg text-white w-96">
              <h3 className="text-lg font-semibold mb-4">
                What should I call you Master
              </h3>
              <input
                type="text"
                onChange={handleInputChanges}
                className="border border-gray-300 bg-slate-700 p-2 text-white rounded-md w-full"
                placeholder="Enter your name"
              />
              <button
                onClick={handleSubmitName}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative flex sm:flex-row flex-col items-center">
              <ImagePopup
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                sendNotification={scheduleNotification}
                onClick={hidePopupVisible}
                text={`Bonjour Master ${inputName}, I am Alfred your very own butler to help you in predicting and buying crypto with informed`}
              />
              <div>
                <div
                  className="bg-white rounded-full absolute "
                  id="circular1"
                ></div>
                <div
                  className="bg-white rounded-full absolute "
                  id="circular2"
                ></div>
                <div
                  className="bg-white rounded-full absolute "
                  id="circular3"
                ></div>
                <img src="/alfred2.png" id="alfred" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio;

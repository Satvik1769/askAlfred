import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import ImagePopup from "./ImagePopup";
import "../image.css";
import { useName } from "../Context/NameContext";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import tokenData from "../assets/tokenData";
import { FixedSizeList as List } from "react-window";
import Moralis from "moralis";
import useSendNotification from "../hooks/useSendNotifications";

const SwapInterface = () => {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: false },
    { name: "Swap", href: "/SwapInterface", current: true },
    { name: "Predict", href: "/predict", current: false },
    { name: "Notifications", href: "/notifications", current: false },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputNumber, setInputNumber] = useState(0);
  const [activeTokenSelection, setActiveTokenSelection] = useState(null);
  const { address, chainId } = useWeb3ModalAccount();
  const { handleSendNotification, isSending } = useSendNotification();

  const moralisApi = import.meta.env.VITE_MORALIS_API;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Token selection states
  const [selectedToken1, setSelectedToken1] = useState(tokenData[1]); // Default for first token
  const [selectedToken2, setSelectedToken2] = useState("Select a Token"); // Default for second token

  // Other state variables
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [tokensData, setTokensData] = useState(null);
  const [walletTokens, setWalletTokens] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const { isConnected } = useWeb3ModalAccount();
  const {
    isModalVisible,
    isPopupVisible,
    showModal,
    hideModal,
    handleInputChanges,
    handleSubmitName,
    hidePopupVisible,
    inputName,
    showPopupVisible,
  } = useName();

  console.log(inputName);

  useEffect(() => {
    const initializeMoralis = async () => {
      if (!Moralis.Core.isStarted) {
        try {
          await Moralis.start({
            apiKey: moralisApi,
          });
          console.log("Moralis initialized");
        } catch (e) {
          console.error("Error initializing Moralis:", e);
        }
      }
    };
    initializeMoralis();
  }, [moralisApi]);

  // Fetch tokens and wallet balances when chainId changes
  useEffect(() => {
    if (!chainId) {
      console.log("Waiting for chainId...");
      return;
    }

    // Fetch token data for the selected chainId
    const fetchTokensData = async () => {
      try {
        const response = await fetch(`${backendUrl}/token/${chainId}`, {
          method: "GET",
        });
        const data = await response.json();
        setTokensData(data);
      } catch (error) {
        console.error("Error fetching chain data:", error);
      }
    };

    // Fetch wallet tokens for the current chainId
    const fetchWalletData = async (chainId) => {
      try {
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          chain: chainId,
          address: address,
        });
        setWalletTokens(response.raw);
        console.log("Wallet Tokens:", response.raw);
      } catch (e) {
        console.error("Error fetching wallet data:", e);
      }
    };

    fetchTokensData();
    fetchWalletData(tokenData[chainId].chain);
  }, [chainId, address, backendUrl]);

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        try {
          console.log(isConnected);

          const response = await fetch(`${backendUrl}/name/${address}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          sessionStorage.setItem("inputName", data.name);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter tokens based on search query
  const filteredTokens = tokensData?.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate token price
  const calculateTokenPrice = (token) => {
    return parseFloat(token.balance) / Math.pow(10, token.decimals);
  };

  // Render token row for the modal list
  const Row = ({ index, style }) => {
    const token = filteredTokens[index];
    const combinedStyle = {
      ...style,
      top: `${parseFloat(style.top) + 8}px`,
      height: `${parseFloat(style.height) - 8}px`,
    };
    const walletToken = walletTokens?.find(
      (walletToken) => walletToken.symbol === token.symbol
    );
    const price = walletToken ? calculateTokenPrice(walletToken) : 0;

    const handleClick = () => {
      if (activeTokenSelection === "second") {
        setSelectedToken2(token); // Set the second selected token
      } else {
        setSelectedToken1(token); // Set the first selected token
      }
      setIsTokenModalVisible(false);
    };
    return (
      <div
        key={token.address}
        className="flex items-center justify-between w-full p-2 rounded-xl bg-gray-700 mt-2"
        style={combinedStyle}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-2">
          <img src={token.logoURI} alt={token.name} className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-sm text-gray-200 font-semibold">{token.name}</p>
            <p className="text-xs text-gray-400">{token.symbol}</p>
          </div>
        </div>
        <h2 className="text-white">{price}</h2>
      </div>
    );
  };

  const [sessionName, setName] = useState("");
  useEffect(() => {
    const savedName = sessionStorage.getItem("inputName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleNumberChange = (event) => {
    setInputNumber(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("clicked");
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <NavigationBar navigation={navigation} />
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
          {/* First token selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Token</label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <button
                className="bg-slate-700 border-none text-white focus:outline-none flex-shrink-0"
                onClick={() => {
                  setActiveTokenSelection("first");
                  setIsTokenModalVisible(true);
                }}
              >
                {selectedToken1?.symbol}
              </button>
              <input
                type="number"
                className="bg-transparent border-none text-right text-white flex-grow focus:outline-none"
                placeholder="0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>

          {/* Second token selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              You Receive
            </label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <button
                className="bg-slate-700 border-none text-white focus:outline-none flex-shrink-0"
                onClick={() => {
                  setActiveTokenSelection("second");
                  setIsTokenModalVisible(true);
                }}
              >
                {selectedToken2.symbol ? selectedToken2.symbol : selectedToken2}
              </button>
              <input
                type="number"
                className="bg-transparent border-none text-right w-[100%] text-white focus:outline-none"
                placeholder="0"
                value={inputNumber}
                readOnly
              />
            </div>
          </div>

          {/* Swap button */}
          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition duration-300"
            onClick={() => {
              console.log("clicked");
              showPopupVisible();
            }}
          >
            Swap
          </button>
        </div>
      </div>
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          style={{ outline: "2px solid red" }}
        >
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
                className="bg-white rounded-full absolute"
                id="circular1"
              ></div>
              <div
                className="bg-white rounded-full absolute"
                id="circular2"
              ></div>

              <div
                className="bg-white rounded-full absolute"
                id="circular3"
              ></div>

              <img src="/alfred2.png" id="alfred" />
            </div>
          </div>
        </div>
      )}
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
              text={`Bonjour Master ${sessionName}, I am Alfred your very own butler to help you in predicting and buying crypto with informed`}
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
      {isTokenModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div
            className="p-8 rounded-3xl bg-slate-800 max-h-[80%] max-w-lg w-[90%] mb-4 border-2 border-slate-500"
            style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
          >
            <h3 className="font-medium text-lg tracking-tight text-gray-200 leading-tight mb-4">
              Select a Token
            </h3>
            <input
              type="text"
              className="mb-4 w-full p-2 bg-gray-600 text-white rounded"
              placeholder="Search token..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <List
              height={550}
              itemCount={filteredTokens.length}
              itemSize={78}
              width="100%"
              isSecondTokenSelection={activeTokenSelection === "first"}
            >
              {Row}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapInterface;

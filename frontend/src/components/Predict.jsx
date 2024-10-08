import ImagePopup from "./ImagePopup";
import NavigationBar from "./NavigationBar";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useState, useEffect, useMemo } from "react";
import "../image.css";
import useSendNotification from "../hooks/useSendNotifications";
import { useName } from "../Context/NameContext";
import { FixedSizeList as List } from "react-window";
import Moralis from "moralis";
import tokenData from "../assets/tokenData";

export default function Predict() {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: false },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: true },
    { name: "Notifications", href: "/notifications", current: false },
  ];
  const moralisApi = import.meta.env.VITE_MORALIS_API;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { handleSendNotification, isSending } = useSendNotification();
  const { address, chainId } = useWeb3ModalAccount();
  const [walletTokens, setWalletTokens] = useState(null);

  const [selectedData, setSelectedData] = useState(tokenData[1]);
  const [tokensData, setTokensData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
  }, []);

  useEffect(() => {
    if (!chainId) {
      console.log("Waiting for chainId...");
      return;
    }

    // Set selected token data based on chainId
    if (tokenData[chainId]) {
      setSelectedData(tokenData[chainId]);
    } else {
      setSelectedData(tokenData[1]); // Fallback
    }

    const chainData = async () => {
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

    const walletData = async (chainId) => {
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

    chainData();
    walletData(tokenData[chainId].chain);
  }, [chainId]);

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
  } = useName();

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTokens = tokensData?.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const calculateTokenPrice = (token) => {
    return parseFloat(token.balance) / Math.pow(10, token.decimals);
  };
  const Row = ({ index, style }) => {
    const token = filteredTokens[index];
    const combinedStyle = {
      ...style,
      top: `${parseFloat(style.top) + 8}px`, // Adjust the top position to account for margin
      height: `${parseFloat(style.height) - 8}px`, // Adjust the height if needed
    };
    const walletToken = walletTokens.find(
      (walletToken) => walletToken.symbol === token.symbol
    );
    // Calculate the price if the walletToken exists, otherwise set it to 0
    const price = walletToken ? calculateTokenPrice(walletToken) : 0;
    const truncate = (text, maxLength) =>
      text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    // Define the maximum length for token name and symbol
    const maxNameLength = 25; // Customize the length as needed
    const maxSymbolLength = 15; // Customize the length as needed

    return (
      <div
        key={token.address}
        className="flex items-center justify-between w-full p-2 rounded-xl bg-gray-700 mt-2"
        style={combinedStyle}
        onClick={() => {
          setSelectedData(token);
          setIsTokenModalVisible(false);
        }}
      >
        <div className="flex items-center space-x-2">
          <img src={token.logoURI} alt={token.name} className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="text-sm text-gray-200 font-semibold">
              {truncate(token.name, maxNameLength)}
            </p>
            <p className="text-xs text-gray-400">
              {truncate(token.symbol, maxSymbolLength)}
            </p>
          </div>
        </div>
        <h2 className="text-white">{price}</h2>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar navigation={navigation} />
      <div className="flex justify-center items-center mt-40">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Predict</label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <button
                className="bg-slate-700 border-none text-white focus:outline-none flex-shrink-0"
                onClick={() => {
                  console.log("clicked");
                  setIsTokenModalVisible(true);
                }}
              >
                {selectedData.symbol}
              </button>
              <input
                type="number"
                className="bg-transparent border-none text-center text-white flex-grow focus:outline-none"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition duration-300"
            onClick={handleButtonClick}
          >
            Predict
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
      {isTokenModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div
            aria-label="card"
            className="p-8 rounded-3xl bg-slate-800 max-h-[80%] max-w-lg w-[90%] mb-4 border-2 border-slate-500"
            style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
          >
            <div aria-label="header" className="flex items-center space-x-2">
              <div className="space-y-0.5 flex-1">
                <h3 className="font-medium text-lg tracking-tight text-gray-200 leading-tight">
                  Select a Token
                </h3>
              </div>
              <button
                className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"
                onClick={() => setIsTokenModalVisible(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17 7l-10 10"></path>
                  <path d="M8 7h9v9"></path>
                </svg>
              </button>
            </div>
            <div
              aria-label="content"
              className="mt-1 grid gap-2.5 p-2 justify-items-center"
            >
              <div class="pt-2 relative mx-auto text-gray-600">
                <input
                  className="border-2 border-sky-700 bg-slate-950 text-slate-400 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search by Name or Address"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-5 mr-4"
                >
                  <svg
                    className="text-gray-600 h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    style={{ enableBackground: "new 0 0 56.966 56.966" }}
                    xmlSpace="preserve"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>

              <div className="w-[90%] flex flex-col max-h-[65vh] overflow-y-auto">
                {tokensData && (
                  <List
                    height={550}
                    itemCount={filteredTokens.length}
                    itemSize={78}
                    width={"100%"}
                  >
                    {Row}
                  </List>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import ImagePopup from "./ImagePopup";
import NavigationBar from "./NavigationBar";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useState } from "react";
import "../image.css";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useSendNotification from "../hooks/useSendNotifications";

export default function Predict() {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: false },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: true },
    { name: "Notifications", href: "/notifications", current: false },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { address } = useWeb3ModalAccount();
  const { handleSendNotification, isSending } = useSendNotification();

  const date = "2024-08-18"; // Today's date
  const time = "12:38"; // The time you want to schedule

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const scheduleNotification = () => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const delay = selectedDateTime - now;

    if (delay > 0) {
      setTimeout(async () => {
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
        console.log("Notification sent");
      }, delay);
    } else {
      console.error(
        "Selected time is in the past. Please choose a future time."
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar navigation={navigation} />
      <div className="flex justify-center items-center mt-40">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Predict</label>
            <div className="flex items-center bg-gray-700 p-3 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <select className="bg-slate-700 border-none text-white focus:outline-none flex-shrink-0">
                <option>ETH</option>
                <option>BTC</option>
              </select>
              <input
                type="number"
                className="bg-transparent border-none text-right text-white flex-grow focus:outline-none"
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
    </div>
  );
}

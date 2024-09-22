import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import notificationIcon from "../assets/notifications.svg";
import notificationRing from "../assets/notification_ring.svg";
import notificationStop from "../assets/notification_stop.png";
import { useName } from "../Context/NameContext";

import "../button.css";
import {
  useWeb3InboxClient,
  usePrepareRegistration,
  useRegister,
  useSubscribe,
  useUnsubscribe,
  useSubscription,
  useWeb3InboxAccount,
  useNotifications,
  useUnregister,
} from "@web3inbox/react";
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import NotificationData from "./NotificationData";
import ImagePopup from "./ImagePopup";

const Card = ({ data, text }) => {
  return (
    <div className="flex items-center bg-slate-900 justify-center min-h-screen ">
      <div
        aria-label="card"
        className="p-8 rounded-3xl bg-slate-800 max-w-sm w-full mb-4  border-2 border-slate-500"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div aria-label="header" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 shrink-0"
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
            <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
          </svg>
          <div className="space-y-0.5 flex-1">
            <h3 className="font-medium text-lg tracking-tight text-gray-200 leading-tight">
              AI Power Analytics
            </h3>
            <p className="text-sm font-normal text-gray-400 leading-none">
              powered by askAlfred
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"
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
              <path d="M8 7l9 0l0 9"></path>
            </svg>
          </a>
        </div>
        <div
          aria-label="content"
          className="mt-9 grid gap-2.5 p-2 justify-items-center"
        >
          <p className="mb-10 text-white">{text}</p>
          {data.map((item, index) => {
            return (
              <button
                key={index}
                className="w-full flex justify-center"
                onClick={item.onclick}
                disabled={item.disabled}
              >
                <div
                  role="button"
                  className={`flex items-center w-full p-3.5 mt-2 rounded-lg bg-gray-700 text-white border border-gray-500 hover:bg-gray-600`}
                  id={item.id}
                >
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-gray-500 text-white">
                    <img
                      src={item.iconPath}
                      alt={item.name}
                      style={{ height: 20 }}
                    />
                  </span>
                  <div className="flex flex-col flex-1 ml-2">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function NotificationPage() {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Portfolio", href: "/portfolio", current: false },
    { name: "Swap", href: "/SwapInterface", current: false },
    { name: "Predict", href: "/predict", current: false },
    { name: "Notifications", href: "/notifications", current: true },
  ];
  const { isConnected } = useWeb3ModalAccount();
  console.log(isConnected);
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [isVisible, setIsVisible] = useState(false);

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

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
    console.log(isVisible);
  };

  async function onSignMessage(message) {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(message);
    console.log("Signature:", signature);
    return signature;
  }
  const handleRegistration = async () => {
    try {
      const { message, registerParams } = await prepareRegistration();
      console.log("prepareRegistration result:", { message, registerParams });
      if (typeof message !== "string") {
        throw new Error("Registration message is not a string");
      }
      const signature = await onSignMessage(message);
      console.log("onSignMessage result:", signature);

      await register({ registerParams, signature });
      console.log("Registration Successful");
    } catch (registerIdentityError) {
      console.error("Registration Error:", registerIdentityError);
    }
  };
  const handleSubscription = async () => {
    try {
      if (isSubscribed) {
        await unsubscribe();
        console.log("Unsubscription Successful");
      } else {
        await subscribe();
        console.log("Subscription Successful");
      }
    } catch (subscribeError) {
      console.error("Subscription Error:", subscribeError);
    }
  };

  const { prepareRegistration } = usePrepareRegistration();
  const { register, isLoading: isRegistering } = useRegister();
  const { data: w3iClient, isLoading: w3iClientIsLoading } =
    useWeb3InboxClient();
  const { isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`);
  const { subscribe, isLoading: isSubscribing } = useSubscribe();
  const { unsubscribe, isLoading: isUnsubscribing } = useUnsubscribe();
  const { data: subscription } = useSubscription();
  const { data: notifications } = useNotifications(5);
  console.log(notifications);

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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  const isSubscribed = Boolean(subscription);
  const data_unregistered = [
    {
      name: "Register",
      iconPath: notificationIcon,
      onclick: handleRegistration,
      id: isConnected ? "box" : "",
      disabled: !isConnected,
    },
  ];
  const data_registered = [
    {
      name: "Subscribe",
      iconPath: notificationIcon,
      onclick: handleSubscription,
      id: "box",
      disabled: false,
    },
    {
      name: "Notifications",
      iconPath: notificationRing,
      onclick: handleButtonClick,
      id: "",
      disabled: true,
    },
  ];
  const data_subscribed = [
    {
      name: "Unsubscribe",
      iconPath: notificationStop,
      onclick: handleSubscription,
      id: "",
      disabled: false,
    },
    {
      name: "Notifications",
      iconPath: notificationRing,
      onclick: handleButtonClick,
      id: "box",
      disabled: false,
    },
  ];

  return (
    <div className="relative h-full">
      <NavigationBar navigation={navigation} />
      <div className="flex flex-col text-white">
        {!isRegistered ? (
          <Card
            data={data_unregistered}
            text="Connect your wallet to the app and enable notifications first in
            order to send and receive notifications."
          />
        ) : isConnected && !isSubscribed ? (
          <Card
            data={data_registered}
            text="Subscribe to askAlfred and enable notifications first in
            order to send and receive notifications."
          />
        ) : (
          <Card
            data={data_subscribed}
            text="Your wallet is connected to the app and you are able to receive notifications."
          />
        )}
        {isVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            style={{ outline: "2px solid red" }}
          >
            <div
              aria-label="card"
              className="p-8 rounded-3xl bg-slate-800 max-h-[80%] max-w-lg w-[90%] mb-4 border-2 border-slate-500"
              style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
            >
              <div aria-label="header" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 shrink-0"
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
                  <path d="M13 3v7h6l-8 11v-7H5l8-11z"></path>
                </svg>
                <div className="space-y-0.5 flex-1">
                  <h3 className="font-medium text-lg tracking-tight text-gray-200 leading-tight">
                    AI Power Analytics
                  </h3>
                  <p className="text-sm font-normal text-gray-400 leading-none">
                    powered by askAlfred
                  </p>
                </div>
                <button
                  onClick={handleButtonClick}
                  className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"
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
                className="mt-9 grid gap-2.5 p-2 justify-items-center"
              >
                <div className="w-[90%] flex flex-col max-h-[65vh] overflow-y-auto">
                  <NotificationData handleButtonClick={handleButtonClick} />
                </div>
              </div>
            </div>
          </div>
        )}
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
  );
}

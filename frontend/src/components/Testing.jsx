import React from "react";
import {
  useWeb3InboxClient,
  usePrepareRegistration,
  useRegister,
  useSubscribe,
  useUnsubscribe,
  useSubscription,
  useWeb3InboxAccount,
  useUnregister,
} from "@web3inbox/react";
import Notifications from "./Notifications";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import useSendNotification from "../hooks/useSendNotifications";

export default function Testing() {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { handleSendNotification, isSending } = useSendNotification();

  const date = "2024-08-18"; // Today's date
  const time = "12:13"; // The time you want to schedule

  async function onSignMessage(message) {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(message);
    console.log("Signature:", signature);
    return signature;
  }

  const { prepareRegistration } = usePrepareRegistration();
  const { register, isLoading: isRegistering } = useRegister();
  const { data: w3iClient, isLoading: w3iClientIsLoading } =
    useWeb3InboxClient();
  const { isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`);
  const { subscribe, isLoading: isSubscribing } = useSubscribe();
  const { unsubscribe, isLoading: isUnsubscribing } = useUnsubscribe();
  const { data: subscription } = useSubscription();
  const isSubscribed = Boolean(subscription);

  // Initialize useUnregister hook
  const { unregister, isLoading: isUnregistering } = useUnregister();

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

  const handleUnregister = async () => {
    try {
      await unregister();
      console.log("Unregistration Successful");
    } catch (unregisterError) {
      console.error("Unregistration Error:", unregisterError);
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

  const scheduleNotification = () => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const delay = selectedDateTime - now;

    if (delay > 0) {
      setTimeout(async () => {
        await handleSendNotification({
          account: `eip155:1:${address}`,
          notification: {
            title: "Lord Save America !",
            body: "This is a test for America",
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
    <main>
      {w3iClientIsLoading ? (
        <div className="text-white">Loading W3I Client</div>
      ) : (
        <div>
          <h1 className="text-white">W3I QuickStart</h1>
          <w3m-button />
          <div>
            <button
              onClick={handleRegistration}
              disabled={isRegistered || isRegistering}
              className="text-white mx-10"
            >
              {isRegistered ? "Registered" : "Register"}
            </button>
            <button
              onClick={handleUnregister}
              disabled={isUnregistering}
              className="text-white mx-10"
            >
              {isRegistered ? "Unregister" : "Already Unregistered"}
            </button>
            <button
              onClick={handleSubscription}
              disabled={isSubscribing || isUnsubscribing}
              className="text-white"
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
            <button
              className="text-white ml-10"
              disabled={!isSubscribed || isSending}
              onClick={scheduleNotification} // Directly calling the function
            >
              Send Notifications
            </button>
            <hr />
            {isSubscribed ? <Notifications /> : null}
          </div>
        </div>
      )}
    </main>
  );
}

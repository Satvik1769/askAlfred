import React from "react";
import {
  useWeb3InboxClient,
  usePrepareRegistration,
  useRegister,
  useSubscribe,
  useUnsubscribe,
  useSubscription,
  useWeb3InboxAccount,
  useUnregister, // Import useUnregister
} from "@web3inbox/react";
import Notifications from "./Notifications";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

export default function Testing() {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

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
      if (typeof message !== "string") {
        throw new Error("Registration message is not a string");
      }
      const signature = await onSignMessage(message);
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
              disabled={isRegistered}
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
              onClick={isSubscribed ? unsubscribe : subscribe}
              disabled={isSubscribing || isUnsubscribing}
              className="text-white"
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
            <hr />
            {isSubscribed ? <Notifications /> : null}
          </div>
        </div>
      )}
    </main>
  );
}

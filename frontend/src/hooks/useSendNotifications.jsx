import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useSendNotification() {
  const [isSending, setIsSending] = useState(false);
  const projectId = import.meta.env.VITE_APP_KIT_PROJECT_ID;
  const secretId = import.meta.env.VITE_APP_KIT_SECRET_ID;

  const handleSendNotification = useCallback(
    async ({ account, notification }) => {
      setIsSending(true);
      try {
        const notificationPayload = {
          accounts: [account],
          notification,
        };

        const result = await fetch(
          `https://notify.walletconnect.com/${projectId}/notify`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${secretId}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(notificationPayload),
          }
        );

        const gmRes = await result.json();

        const { sent, message } = gmRes;
        setIsSending(false);
        console.log(sent, message);
        toast(
          sent
            ? message ?? notification.title
            : `Message failed. Check your data in your preferences?`,
          {
            type: sent ? "success" : "error",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } catch (error) {
        setIsSending(false);
        console.error({ sendNotificationError: error });
        toast.error(`${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    []
  );

  return {
    handleSendNotification,
    isSending,
  };
}

export default useSendNotification;

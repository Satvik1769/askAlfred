import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useSendNotification() {
  const [isSending, setIsSending] = useState(false);
  const date = "24-8-24";
  const time = "23:15";

  const handleSendNotification = useCallback(
    async ({ account, notification }) => {
      setIsSending(true);
      try {
        const notificationPayload = {
          accounts: [account],
          notification,
        };

        const result = await fetch(
          "http://localhost:3001/scheduleNotification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ date, time, notificationPayload }),
          }
        );

        const gmRes = await result.json();
        console.log(gmRes);
        setIsSending(false);
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

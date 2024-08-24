import React, { createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useWeb3InboxClient } from '@web3inbox/react';
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { data: client } = useWeb3InboxClient();
  const { address } = useWeb3ModalAccount();
  const addressData = `eip155:1:${address}`;

  const handleNotification = async ({ addressData }) => {
    try {
    const currentDate = new Date();

      const year = String(currentDate.getFullYear()).slice(-2);
      const month = currentDate.getMonth() + 1; // Months are zero-indexed
      const day = currentDate.getDate();
      
      // Get the user's current timezone
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const dateTime = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Set to `true` for 12-hour time
        timeZone: userTimeZone, // Use the dynamically determined timezone
      });
      
      const timeParts = formatter.formatToParts(dateTime);
      const hours = timeParts.find(part => part.type === 'hour').value;
      const minutes = timeParts.find(part => part.type === 'minute').value;
      
      console.log(`Time: ${hours}:${minutes}`);
      console.log(`User's Timezone: ${userTimeZone}`);
      const time=`${hours}:${minutes}`
      const date=`${day}-${month}-${year}`
      const response = await fetch(`http://localhost:3001/notification`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, time, addressData }),
      });

      const gmRes = await response.json();

      toast.success(gmRes.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    //   toast.error(`Failed to delete notification: ${error.message}`, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    }
  };

  useEffect(() => {
    if (client) {
      const notifyHandler = () => handleNotification({  addressData });

      client.on('notify_message', notifyHandler);

      return () => {
        client.off('notify_message', notifyHandler);
      };
    }
  }, [client,  addressData]);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};

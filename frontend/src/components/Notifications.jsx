// Notifications.tsx
import { useNotifications, useSubscription } from "@web3inbox/react";
import React from "react";

function Notifications() {
  const { data: subscription } = useSubscription();
  const { data: notifications } = useNotifications(5);

  return (
    <div>
      <h2 className="text-white">Notifications</h2>
      <p>You have {subscription.unreadCount} unread notifications.</p>
      <div>
        {!notifications?.length ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map(({ id, ...message }) => (
            <div className="text-white flex " key={id}>
              <div>
                <h3>{message.title}</h3>
                <p>{message.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;

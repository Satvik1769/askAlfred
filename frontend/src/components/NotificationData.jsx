import { useNotifications, useSubscription } from "@web3inbox/react";
import React from "react";

export default function NotificationData({ handleButtonClick }) {
  const { data: notifications } = useNotifications(5);
  console.log(notifications);

  return (
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
            <div>
              {!notifications?.length ? (
                <p className="text-white">No notifications yet.</p>
              ) : (
                notifications.map(({ id, ...message }) => (
                  <div
                    key={id}
                    className="flex items-center w-full p-3.5 mt-2 rounded-lg bg-gray-700 text-white border border-gray-500 hover:bg-gray-600"
                  >
                    <img
                      src="/cropped_image.png"
                      alt="Notification"
                      className="h-12"
                    />
                    <div className="ml-4">
                      <h1 className="text-white text-lg font-medium">
                        {message.title}
                      </h1>
                      <p className="text-gray-400">{message.body}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

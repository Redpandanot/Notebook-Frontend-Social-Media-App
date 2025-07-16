import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useAppSelector } from "../store/hooks";
import { formatDateHeader } from "../utils/helperFunctions";
import { Chat as ChatType } from "../Types/type";

const Chat = () => {
  const { toUserId } = useParams();
  const [chatHistory, setChatHistory] = useState<ChatType[]>([]);
  const [message, setMessage] = useState<string>();
  const profile = useAppSelector((store) => store.profile);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      toUserId,
    });

    socket.on("messageHistory", (messages) => {
      setChatHistory(messages);
    });

    socket.on("messageReceived", (message) => {
      setChatHistory((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      toUserId,
      text: message,
    });
    setMessage("");
  };

  return (
    <div className="w-8/12 h-full m-auto border-2 flex flex-col">
      <div className="flex-grow">
        {chatHistory.map((item, i) => {
          const currentDate = new Date(item.createdAt);
          const prevDate =
            i > 0 ? new Date(chatHistory[i - 1].createdAt) : null;

          const isNewDay =
            !prevDate || currentDate.toDateString() !== prevDate.toDateString();

          return (
            <div key={i}>
              {isNewDay && (
                <div className="text-center text-sm text-gray-500 my-2">
                  {formatDateHeader(currentDate)}
                </div>
              )}
              <div
                className={`chat ${
                  profile?._id === item.fromUserId ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-header">
                  <time className="text-xs opacity-50">
                    {currentDate.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </time>
                </div>
                <div className="chat-bubble chat-bubble-warning whitespace-pre-wrap">
                  {item.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full p-5 border-2">
        <textarea
          className="flex-grow p-1"
          placeholder="enter message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevent newline
              sendMessage(); // send message
            }
          }}
        />
        <button className="btn" onClick={sendMessage}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chat;

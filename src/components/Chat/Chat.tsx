import { useEffect, useMemo, useRef, useState } from "react";
import { createSocketConnection } from "../../utils/socket";
import { useAppSelector } from "../../store/hooks";
import { formatDateHeader } from "../../utils/helperFunctions";
import { Chat as ChatType } from "../../Types/type";
import { debounce, throttle } from "lodash";

interface ChatProp {
  toUserId: string;
}

const Chat: React.FC<ChatProp> = ({ toUserId }) => {
  const [chatHistory, setChatHistory] = useState<ChatType[]>([]);
  const [message, setMessage] = useState<string>();
  const [typingUser, setTypingUser] = useState<boolean>(false);
  const profile = useAppSelector((store) => store.profile);
  const socket = useRef<any>(null);

  useEffect(() => {
    socket.current = createSocketConnection();
    socket.current?.emit("joinChat", {
      toUserId,
    });

    socket.current?.on("messageHistory", (messages: ChatType[]) => {
      setChatHistory(messages);
    });

    socket.current?.on("messageReceived", (message: ChatType) => {
      setChatHistory((prev) => [...prev, message]);
    });

    socket.current?.on("typing", (userId: string) => {
      if (userId === profile?._id) {
        setTypingUser(true);
      }
    });

    socket.current?.on("stopTyping", (userId: string) => {
      if (userId === profile?._id) {
        setTypingUser(false);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [toUserId, profile]);

  useEffect(() => {
    if (typingUser) {
      const timeout = setTimeout(() => setTypingUser(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [typingUser]);

  const sendMessage = () => {
    // const socket = createSocketConnection();
    socket.current.emit("sendMessage", {
      toUserId,
      text: message,
    });
    setMessage("");
  };

  const emitTyping = useMemo(
    () =>
      throttle(() => {
        socket.current?.emit("typing", { toUserId });
      }, 300),
    [toUserId]
  );

  const emitStopTyping = useMemo(
    () =>
      debounce(() => {
        socket.current?.emit("stopTyping", { toUserId });
      }, 1500),
    [toUserId]
  );

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    emitTyping();
    emitStopTyping();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-90px)] m-auto border-2">
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
        {typingUser && (
          <div className="text-sm text-gray-500 px-4 pb-2">Typing...</div>
        )}
      </div>
      <div className="flex w-full p-5 border-2">
        <textarea
          className="flex-grow p-1"
          placeholder="enter message here"
          value={message}
          onChange={handleTyping}
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

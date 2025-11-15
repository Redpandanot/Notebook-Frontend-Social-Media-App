import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { useState } from "react";
import Chat from "../components/Chat/Chat";
import { useLocation } from "react-router-dom";
import { ChatList } from "../Types/type";
import ChatEmpty from "../components/Chat/ChatEmpty";

const Whisper = () => {
  const profile = useAppSelector((state) => state.profile);
  const { state } = useLocation();
  const [chatId, setChatId] = useState<string>(
    state && state.toUserId ? state.toUserId : ""
  );

  const getAllChats = async () => {
    const response = await axios.get(BASE_URL + "/allChats?limit=10", {
      withCredentials: true,
    });
    return response.data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllChats"],
    queryFn: getAllChats,
  });

  if (isPending) {
    return <div className="mb-10 flex flex-col items-center">Loading...</div>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="flex gap-5 ml-10 mt-3 mr-10 mb-3">
      <div className="flex-1">
        <ul className="list rounded-box shadow-md w-60 md:w-full">
          {data.map((chat: ChatList) => {
            return chat.participants.map((item) => {
              if (profile && item._id !== profile._id) {
                return (
                  <li
                    key={chat._id}
                    className={`list-row hover:cursor-pointer hover:opacity-70 ${
                      item._id === chatId &&
                      "bg-secondary-content text-primary-content"
                    }`}
                    onClick={() => setChatId(item._id)}
                  >
                    <div>
                      <img
                        className="size-10 rounded-box"
                        src={item.photo?.url}
                        alt="Profile Image"
                      />
                    </div>
                    <div>
                      <div>{`${item.firstName} ${
                        item.lastName ? item.lastName : ""
                      }`}</div>
                      <div className="text-xs font-semibold opacity-60">
                        {chat.lastMessage.text.slice(0, 40)}...
                      </div>
                    </div>
                  </li>
                );
              }
            });
          })}
        </ul>
      </div>
      <div className="flex-2">
        {chatId ? <Chat toUserId={chatId} /> : <ChatEmpty />}
      </div>
    </div>
  );
};

export default Whisper;

import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FriendsList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);

  const friendsListFetch = async () => {
    const response = await axios.get(BASE_URL + "/friends-list?limit=3", {
      withCredentials: true,
    });
    return response.data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["friends"],
    queryFn: friendsListFetch,
  });

  if (isPending) {
    return (
      <div className="mb-10 flex flex-col items-center">
        <ProfileCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Friends</h1>
      {data.map((friend) => {
        return (
          <div
            key={friend._id}
            className="card bg-base-100 w-72 shadow-sm max-[1150px]:hidden block mb-3"
          >
            <div className="card-body">
              <Card
                _id={friend._id}
                firstName={friend.firstName}
                lastName={friend.lastName}
                photo={friend.photo}
              />
              <button
                className="btn w-20"
                onClick={() => {
                  navigate("/chat/" + friend._id);
                }}
              >
                Chat
              </button>
            </div>
          </div>
        );
      })}
      <button className="btn w-20" onClick={() => setPage((prev) => prev + 1)}>
        More...
      </button>
    </div>
  );
};

export default FriendsList;

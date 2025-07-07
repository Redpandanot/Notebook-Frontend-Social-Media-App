import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";

const FriendsList = () => {
  const friendsListFetch = async () => {
    try {
      const response = await axios.get(BASE_URL + "/friends-list?limit=3", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["friends"],
    queryFn: friendsListFetch,
  });

  if (isPending) {
    return <ProfileCardSkeleton />;
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsList;

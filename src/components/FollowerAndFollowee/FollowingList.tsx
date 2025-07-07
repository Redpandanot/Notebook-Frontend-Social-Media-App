import Card from "../FriendAndRequest/Card";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";

const FollowingList = () => {
  const followingListFetch = async () => {
    try {
      const response = await axios.get(BASE_URL + "/following?limit=3", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["following"],
    queryFn: followingListFetch,
  });

  if (isPending) {
    return <ProfileCardSkeleton />;
  }

  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Following</h1>
      {data.map((item) => {
        return (
          <div
            key={item.followee._id}
            className="card bg-base-100 w-72 shadow-sm max-[1150px]:hidden block mb-3"
          >
            <div className="card-body">
              <Card
                _id={item.followee._id}
                firstName={item.followee.firstName}
                lastName={item.followee.lastName}
                photo={item.followee.photo}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowingList;

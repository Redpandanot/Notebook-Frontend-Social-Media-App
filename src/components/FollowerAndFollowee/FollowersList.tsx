import Card from "../FriendAndRequest/Card";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";

const FollowersList = () => {
  const followersListFetch = async () => {
    const response = await axios.get(BASE_URL + "/followers?limit=3", {
      withCredentials: true,
    });
    return response.data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["followers"],
    queryFn: followersListFetch,
  });

  if (isPending) {
    return <ProfileCardSkeleton />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Followers</h1>
      {data.map((item) => {
        return (
          <div
            key={item.follower._id}
            className="card bg-base-100 w-72 shadow-sm max-[1150px]:hidden block mb-3"
          >
            <div className="card-body">
              <Card
                _id={item.follower._id}
                firstName={item.follower.firstName}
                lastName={item.follower.lastName}
                photo={item.follower.photo}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersList;

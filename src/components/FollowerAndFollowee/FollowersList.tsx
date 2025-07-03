import Card from "../FriendAndRequest/Card";
import { Followers } from "../FriendAndRequest/type";

interface FollowersListProps {
  followers: Followers[];
}

const FollowersList: React.FC<FollowersListProps> = ({ followers }) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Followers</h1>
      {followers.map((item) => {
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

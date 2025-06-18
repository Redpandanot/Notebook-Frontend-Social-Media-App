import Card from "../FriendAndRequest/Card";
import { Followers } from "../FriendAndRequest/type";

interface FollowersListProps {
  following: Followers[];
}

const FollowingList: React.FC<FollowersListProps> = ({ following }) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Following</h1>
      {following.map((item) => {
        return (
          <div
            key={item.followee._id}
            className="card bg-base-100 w-72 shadow-sm max-[1150px]:hidden block"
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

import Card from "./Card";
import { User } from "./type";

interface FriendsListProps {
  friends: User[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Friends</h1>
      {friends.map((friend) => {
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

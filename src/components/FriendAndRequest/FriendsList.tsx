import Card from "./Card";
import { CardDetail } from "./type";

interface FriendsListProps {
  friends: CardDetail[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Friends</h1>
      {friends.map((friend) => {
        return (
          <div
            key={friend._id}
            className="card bg-base-100 w-72 shadow-sm max-[1150px]:hidden block"
          >
            <div className="card-body">
              <Card
                _id={friend._id}
                firstName={friend.firstName}
                lastName={friend.lastName}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsList;

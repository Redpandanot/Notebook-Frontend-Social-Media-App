import React from "react";
import { User } from "../../Types/type";
import useProfileNavigation from "../../hooks/useProfileNavigation";

const Card: React.FC<User> = ({ _id, firstName, lastName, photo }) => {
  const { handleNavigateToProfile } = useProfileNavigation();
  return (
    <div
      className="flex items-center gap-1 cursor-pointer avatar"
      onClick={() => handleNavigateToProfile(_id)}
    >
      <div className="w-5 rounded-full mr-2">
        <img
          alt="Navbar component with Images"
          src={
            photo && photo?.url
              ? photo?.url
              : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
          }
        />
      </div>
      <h2 className="card-title">{firstName}</h2>
      <h2 className="card-title">{lastName}</h2>
    </div>
  );
};

export default Card;

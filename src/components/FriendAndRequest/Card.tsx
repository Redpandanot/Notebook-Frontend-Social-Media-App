import React from "react";
import { User } from "./type";
import useProfileNavigation from "../../hooks/useProfileNavigation";

const Card: React.FC<User> = ({ _id, firstName, lastName, photo }) => {
  const { handleNavigateToProfile } = useProfileNavigation();
  return (
    <div
      className="flex gap-1 cursor-pointer"
      onClick={() => handleNavigateToProfile(_id)}
    >
      <div className="w-10 rounded-full">
        <img alt="Navbar component with Images" src={photo.url} />
      </div>
      <h2 className="card-title">{firstName}</h2>
      <h2 className="card-title">{lastName}</h2>
    </div>
  );
};

export default Card;

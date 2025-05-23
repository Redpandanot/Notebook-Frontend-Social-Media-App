import React from "react";
import { CardDetail } from "./type";
import useProfileNavigation from "../../hooks/useProfileNavigation";

const Card: React.FC<CardDetail> = ({ _id, firstName, lastName }) => {
  const { handleNavigateToProfile } = useProfileNavigation();
  return (
    <div
      className="flex gap-1 cursor-pointer"
      onClick={() => handleNavigateToProfile(_id)}
    >
      <h2 className="card-title">{firstName}</h2>
      <h2 className="card-title">{lastName}</h2>
    </div>
  );
};

export default Card;

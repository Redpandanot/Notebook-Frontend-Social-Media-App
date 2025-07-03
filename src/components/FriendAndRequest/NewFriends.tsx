import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { User } from "./type";
import Card from "./Card";

const NewFriends = () => {
  const [newRequests, setNewRequests] = useState<User[]>([]);

  const fetch = async () => {
    try {
      const result = await axios.get(BASE_URL + "/new-friends?limit=" + 10, {
        withCredentials: true,
      });
      setNewRequests(result.data);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleConnect = async (requestId: string) => {
    try {
      const response = await axios.post(
        BASE_URL + "/friend-request/send/requested/" + requestId,
        null,
        { withCredentials: true }
      );
      console.log(response.data);
      setNewRequests((prev) => {
        return prev.filter((item) => item._id !== requestId);
      });
    } catch (error) {
      window.alert(error);
    }
  };

  const handleFollow = async (requestId: string) => {
    try {
      const response = await axios.post(
        BASE_URL + "/follow/" + requestId,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text font-bold mb-1">Find New Friends</h1>
      {newRequests.length !== 0 ? (
        newRequests.map((request) => {
          return (
            <div
              key={request._id}
              className="card bg-base-100 w-72 shadow-sm max-[1150px]:hidden block mb-3"
            >
              <div className="card-body">
                <Card
                  _id={request._id}
                  firstName={request.firstName}
                  lastName={request.lastName}
                  photo={request.photo}
                />
                <div className="flex gap-5">
                  <div className="card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleConnect(request._id)}
                    >
                      Connect
                    </button>
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleFollow(request._id)}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No new requests available</div>
      )}
    </div>
  );
};

export default NewFriends;

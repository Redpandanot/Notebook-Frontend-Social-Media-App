import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { FriendRequest } from "./type";
import Card from "./Card";

const RequestList = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  const fetch = useCallback(async () => {
    try {
      const result = await axios.get(BASE_URL + "/friend-requests/view", {
        withCredentials: true,
      });
      setRequests(result.data);
    } catch (error) {
      window.alert(error);
    }
  }, [setRequests]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleConnection = async (requestId: string, status: string) => {
    try {
      const response = await axios.post(
        BASE_URL + "/friend-requests/review/" + status + "/" + requestId,
        null,
        {
          withCredentials: true,
        }
      );
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
      console.log(response.data);
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Requests</h1>
      {requests.length !== 0 ? (
        requests.map((request) => {
          return (
            <div key={request._id} className="card bg-base-100 w-72 shadow-sm">
              <div className="card-body">
                <Card
                  _id={request.fromUserId._id}
                  firstName={request.fromUserId.firstName}
                  lastName={request.fromUserId.lastName}
                />
                <div className="flex gap-5">
                  <div className="card-actions">
                    <button
                      className="btn btn-primary bg-blue-500"
                      onClick={() => handleConnection(request._id, "accepted")}
                    >
                      Accept
                    </button>
                  </div>
                  <div className="card-actions bg-red-500">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleConnection(request._id, "rejected")}
                    >
                      Reject
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

export default RequestList;

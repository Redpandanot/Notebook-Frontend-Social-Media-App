import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { OutletType, User } from "../../Types/type";
import Card from "./Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";

const NewFriends = () => {
  const { mainScrollRef } = useOutletContext<OutletType>();

  const [ref, inView] = useInView({
    root: mainScrollRef?.current,
    rootMargin: "500px",
    threshold: 0,
  });

  const LIMIT = 10;

  const fetchNewFriends = async ({ pageParam = 1 }) => {
    const result = await axios.get(
      BASE_URL + `/new-friends?limit${LIMIT}&page=${pageParam}`,
      {
        withCredentials: true,
      }
    );

    return result.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["newFriends"],
    queryFn: fetchNewFriends,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === LIMIT) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="mb-10 flex flex-col items-center">
        <ProfileCardSkeleton />
      </div>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text font-bold mb-1">Find New Friends</h1>
      {data?.pages.map((page) => {
        return page.map((request: User) => {
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
        });
      })}
      {hasNextPage ? (
        <button ref={ref} className="btn w-30" onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? (
            <span className="loading loading-ring loading-xl m-auto"></span>
          ) : (
            hasNextPage && "Load More"
          )}
        </button>
      ) : (
        "Nothing more to load"
      )}
    </div>
  );
};

export default NewFriends;

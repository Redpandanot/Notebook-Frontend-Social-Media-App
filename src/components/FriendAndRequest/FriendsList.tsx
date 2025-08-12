import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Card from "./Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { OutletType, User } from "../../Types/type";

const FriendsList = () => {
  const navigate = useNavigate();
  const { mainScrollRef } = useOutletContext<OutletType>();

  const [ref, inView] = useInView({
    root: mainScrollRef?.current,
    rootMargin: "500px",
    threshold: 0,
  });

  const LIMIT = 10;

  const friendsListFetch = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      BASE_URL + `/friends-list?limit=${LIMIT}&page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["friends"],
    queryFn: friendsListFetch,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === LIMIT) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

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
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Friends</h1>
      {data?.pages.map((page) => {
        return page.map((friend: User) => {
          return (
            <div
              key={friend._id}
              className="card bg-base-100 w-72 shadow-sm block mb-3"
            >
              <div className="card-body">
                <Card
                  _id={friend._id}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  photo={friend.photo}
                />
                <button
                  className="btn w-20"
                  onClick={() => {
                    navigate("/chat", {
                      state: {
                        toUserId: friend._id,
                      },
                    });
                  }}
                >
                  Chat
                </button>
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

export default FriendsList;

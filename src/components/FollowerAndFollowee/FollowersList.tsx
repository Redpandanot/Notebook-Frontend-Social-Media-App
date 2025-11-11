import Card from "../FriendAndRequest/Card";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";
import { useOutletContext } from "react-router-dom";
import { Followers, OutletType } from "../../Types/type";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const FollowersList = () => {
  const { mainScrollRef } = useOutletContext<OutletType>();

  const [ref, inView] = useInView({
    root: mainScrollRef?.current,
    rootMargin: "500px",
    threshold: 0,
  });

  const LIMIT = 10;

  const followersListFetch = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      BASE_URL + `/followers?limit=${LIMIT}&page=${pageParam}`,
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
    queryKey: ["followers"],
    queryFn: followersListFetch,
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
        <h1 className="text font-bold mb-1">Followers</h1>
        <ProfileCardSkeleton />
      </div>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Followers</h1>
      {data?.pages.map((page) => {
        return page.map((item: Followers) => {
          return (
            <div
              key={item.follower._id}
              className="card bg-base-100 w-72 shadow-sm block mb-3"
            >
              <div className="card-body">
                <Card
                  _id={item.follower._id}
                  firstName={item.follower.firstName}
                  lastName={item.follower.lastName}
                  photo={item.follower.photo}
                />
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

export default FollowersList;

import { useEffect, useState } from "react";
import {
  FriendRequestStatus,
  friendSuggestionsLimit,
} from "../../utils/constants";
import { OutletType, ProfileDetail } from "../../Types/type";
import Card from "./Card";
import { useMutation } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";
import { ConnectionAction } from "../../utils/constants";
import { followRequest, friendRequest } from "../../api/connection";
import useFriendSuggestions from "../../hooks/useFriendSuggestions";

const NewFriends = () => {
  const { mainScrollRef } = useOutletContext<OutletType>();

  const [clicked, setClicked] = useState<
    { id: string; action: ConnectionAction }[]
  >([]);

  const [ref, inView] = useInView({
    root: mainScrollRef?.current,
    rootMargin: "500px",
    threshold: 0,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useFriendSuggestions(friendSuggestionsLimit);

  const handleConnect = async (userId: string) => {
    const result = await friendRequest(FriendRequestStatus.Requested, userId);
    return result;
  };

  const handleFollow = async (userId: string) => {
    const result = await followRequest(userId);
    return result;
  };

  const connectMutation = useMutation({
    mutationFn: handleConnect,
    onMutate: (userId: string) => {
      setClicked((prev) => [
        ...prev,
        { id: userId, action: ConnectionAction.Connect },
      ]);
    },
    onError: (_err, userId) => {
      setClicked((prev) => prev.filter((c) => c.id !== userId));
    },
  });

  const followMutation = useMutation({
    mutationFn: handleFollow,
    onMutate: (userId: string) => {
      setClicked((prev) => [
        ...prev,
        { id: userId, action: ConnectionAction.Follow },
      ]);
    },
    onError: (_err, userId) => {
      setClicked((prev) => prev.filter((c) => c.id !== userId));
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text font-bold mb-1">Find New Friends</h1>
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
      {data?.pages.map((page) =>
        page.map((user: ProfileDetail) => (
          <div
            key={user._id}
            className="card bg-base-100 w-72 max-[1150px]:hidden block shadow-sm mb-3"
          >
            <div className="card-body">
              <Card
                _id={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                photo={user.photo}
              />
              <div className="flex gap-5">
                <button
                  className="btn btn-primary"
                  onClick={() => connectMutation.mutate(user._id)}
                  disabled={clicked.some(
                    (c) =>
                      c.id === user._id && c.action === ConnectionAction.Connect
                  )}
                >
                  Connect
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => followMutation.mutate(user._id)}
                  disabled={
                    clicked.some(
                      (c) =>
                        c.id === user._id &&
                        c.action === ConnectionAction.Follow
                    ) || user.isFollowing
                  }
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))
      )}
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

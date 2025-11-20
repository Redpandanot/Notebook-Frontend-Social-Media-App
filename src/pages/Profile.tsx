import { useParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useCallback, useEffect, useState } from "react";
import { FriendRequestStatus } from "../utils/constants";
import { Post, ProfileDetail } from "../Types/type";
import { useAppSelector } from "../store/hooks";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import { useMutation } from "@tanstack/react-query";
import {
  followRequest,
  friendRequest,
  reviewFriendRequest,
  unFriendRequest,
} from "../api/connection";
import { viewPost } from "../api/feed";
import { viewProile } from "../api/profile";

interface ConnectionStatus {
  followClicked: boolean;
  friendClicked: boolean;
}

const Profile = () => {
  const { userId } = useParams();
  const profile = useAppSelector((state) => state.profile);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [user, setUser] = useState<ProfileDetail | null>(null);
  const [posts, setPosts] = useState([]);
  const [clicked, setClicked] = useState<ConnectionStatus>({
    followClicked: false,
    friendClicked: false,
  });

  const postFetch = useCallback(
    async (profileId: string) => {
      try {
        setPostLoading(true);
        const result = await viewPost(profileId);
        setPosts(result);
        setPostLoading(false);
      } catch (error) {
        setPostLoading(false);
        window.alert("from feed" + error);
      }
    },
    [setPostLoading]
  );

  const profileFetch = useCallback(async (userId: string) => {
    const result = await viewProile(userId);
    setUser(result);
  }, []);

  useEffect(() => {
    if (userId) {
      profileFetch(userId);
      postFetch(userId);
    } else {
      if (profile) postFetch(profile._id);
    }

    return () => setPosts([]);
  }, [postFetch, profile, userId, profileFetch]);

  const handleConnect = async (userId: string) => {
    let response;
    if (!user?.connectionStatus) {
      response = await friendRequest(FriendRequestStatus.Requested, userId);
    } else if (
      user?.connectionStatus?.status === FriendRequestStatus.Accepted
    ) {
      response = await unFriendRequest(userId);
    } else if (
      user?.connectionStatus?.fromUserId === userId &&
      user?.connectionStatus?.status === FriendRequestStatus.Requested
    ) {
      response = await reviewFriendRequest(
        FriendRequestStatus.Accepted,
        user?.connectionStatus?._id
      );
    }
    return response;
  };

  const connectMutation = useMutation({
    mutationFn: handleConnect,
    onMutate: () => {
      setClicked((prev) => {
        return {
          ...prev,
          friendClicked: true,
        };
      });
    },
  });

  const followMutation = useMutation({
    mutationFn: followRequest,
    onMutate: () => {
      setClicked((prev) => {
        return {
          ...prev,
          followClicked: true,
        };
      });
    },
    onSuccess: () => {
      setUser((prev) => {
        return (
          prev && {
            ...prev,
            isFollowing: !prev.isFollowing,
          }
        );
      });
    },
    onSettled: () => {
      setClicked((prev) => {
        return {
          ...prev,
          followClicked: false,
        };
      });
    },
  });

  const connectionString = (user: ProfileDetail) => {
    let statusString = "Add Friend";

    if (user?.connectionStatus?.status === FriendRequestStatus.Accepted) {
      statusString = "Unfriend";
    } else if (user?.connectionStatus?.fromUserId === user._id) {
      statusString = "Accept Request";
    } else if (user?.connectionStatus?.toUserId === user._id) {
      statusString = "Pending";
    }
    return statusString;
  };

  if (!user) {
    return <ProfilePostSkeleton />;
  }

  return (
    <div className="flex flex-col justify-center w-full">
      <div>
        <div>
          {user && (
            <div className="flex justify-center mt-5">
              <div className="card bg-base-100 w-96 shadow-sm">
                <figure className="px-10 pt-10">
                  <img
                    src={user.photo.url}
                    alt="Profile Avatar"
                    className="rounded-xl"
                  />
                </figure>
                {profile?._id !== user._id && (
                  <div className="flex justify-center gap-2">
                    <button
                      className="btn btn-primary mt-3 w-30"
                      onClick={() => {
                        if (
                          !(
                            user?.connectionStatus?.fromUserId ===
                              profile?._id &&
                            user.connectionStatus?.status ===
                              FriendRequestStatus.Requested
                          )
                        ) {
                          connectMutation.mutate(user._id);
                        }
                      }}
                      disabled={clicked.friendClicked}
                    >
                      {connectionString(user)}
                    </button>
                    <button
                      className="btn btn-primary mt-3 w-30"
                      onClick={() => followMutation.mutate(user._id)}
                      disabled={clicked.followClicked}
                    >
                      {user.isFollowing ? "UnFollow" : "Follow"}
                    </button>
                  </div>
                )}
                <div className="card-body items-start text-center">
                  <h2 className="card-title mb-2">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> {user.emailId}
                  </p>
                  {user.age !== undefined && user.age !== null && (
                    <p className="text-sm text-gray-700">
                      <strong>Age:</strong> {user.age}
                    </p>
                  )}
                  {user.gender && (
                    <p className="text-sm text-gray-700">
                      <strong>Gender:</strong> {user.gender}
                    </p>
                  )}
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">
                      College/University:
                    </h3>
                    <p className="text-sm text-gray-600">
                      {user.college ? user.college : "Not Entered"}
                    </p>
                  </div>
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">About:</h3>
                    <p className="text-sm text-gray-600">
                      {user.about ? user.about : "Not Entered"}
                    </p>
                  </div>
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">Skills:</h3>
                    <p className="text-sm text-gray-600">
                      {user.skills.length > 0
                        ? user.skills.join(", ")
                        : "Not Entered"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last Updated:{" "}
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          {!user && (
            <div className="flex justify-center mt-5">
              <p className="text-lg text-gray-600">
                Loading profile or no user found...
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-medium mt-10 mb-10">Posts</h1>
          {postLoading ? (
            <span className="loading loading-ring loading-xl m-auto"></span>
          ) : null}
          {posts.map((post: Post) => {
            return <Posts key={post._id} postObject={post} />;
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;

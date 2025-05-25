import { useLocation } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { ProfileDetail } from "./types";
import UploadImages from "../components/UploadImages/UploadImages";

interface ProfileDetailProps {
  profile: ProfileDetail;
}

const Profile: React.FC<ProfileDetailProps> = ({ profile }) => {
  const location = useLocation();
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState([]);
  const user =
    location.state && location.state.profile ? location.state.profile : profile;

  const postFetch = useCallback(
    async (profileId: string) => {
      try {
        setPostLoading(true);
        console.log(profileId);
        const result = await axios.get(BASE_URL + "/posts/view/" + profileId, {
          withCredentials: true,
        });
        setPosts(result.data);
        setPostLoading(false);
      } catch (error) {
        setPostLoading(false);
        window.alert("from feed" + error);
      }
    },
    [setPostLoading]
  );

  const handleUpdateProfileImage = async (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        BASE_URL + "/profile/addImage",
        formData,
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
    if (location.state && location.state.profile) {
      postFetch(location.state.profile._id);
    } else postFetch(profile._id);
  }, [postFetch, location, profile]);

  return (
    <div className="flex flex-col justify-center w-full">
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
              <UploadImages handleImage={handleUpdateProfileImage} />
              <div className="card-body items-center text-center">
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
                {user.about && (
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">About:</h3>
                    <p className="text-sm text-gray-600">{user.about}</p>
                  </div>
                )}
                {user.skills && user.skills.length > 0 && (
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">Skills:</h3>
                    <p className="text-sm text-gray-600">
                      {user.skills.join(", ")}
                    </p>{" "}
                  </div>
                )}
                {user.createdAt && (
                  <p className="text-xs text-gray-500 mt-4">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}{" "}
                  </p>
                )}
                {user.updatedAt && (
                  <p className="text-xs text-gray-500">
                    Last Updated:{" "}
                    {new Date(user.updatedAt).toLocaleDateString()}{" "}
                  </p>
                )}
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
        <h1 className="bg-blue-400 w-10/12 md:w-5/12 mt-5 p-5 mb-2">Posts</h1>
        {posts.length !== 0 && <Posts feed={posts} />}
      </div>
    </div>
  );
};

export default Profile;

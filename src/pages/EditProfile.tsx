import axios from "axios";
import UploadImages from "../components/UploadImages/UploadImages";
import { useAppSelector } from "../store/hooks";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { ProfileDetail } from "../Types/type";

const EditProfile = () => {
  const profile = useAppSelector((state) => state.profile);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [profileState, setProfileState] = useState<ProfileDetail | null>(
    profile
  );

  const handleUpdateProfileImage = async (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(BASE_URL + "/profile/addImage", formData, {
        withCredentials: true,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileState || !profile) return;

    const excludeFields = [
      "_id",
      "photo",
      "skills",
      "createdAt",
      "updatedAt",
      "emailId",
    ];
    const editedState: Partial<Record<keyof ProfileDetail, unknown>> = {};

    for (const key of Object.keys(profileState) as (keyof ProfileDetail)[]) {
      if (!excludeFields.includes(key) && profile[key] !== profileState[key]) {
        editedState[key] = profileState[key];
      }
    }
    try {
      await axios.post(
        BASE_URL + "/profile/edit",
        {
          ...editedState,
        },
        {
          withCredentials: true,
        }
      );
      setEditProfile(false);
    } catch {
      window.alert("Profile edit failed :(");
    }
  };

  return (
    <div className="flex flex-col justify-center w-full">
      {!editProfile ? (
        <div>
          {!profile ? (
            <div className="flex justify-center mt-5">
              <p className="text-lg text-gray-600">
                Loading profile or no user found...
              </p>
            </div>
          ) : (
            <div className="flex justify-center mt-5">
              <div className="card bg-base-100 w-96 shadow-sm">
                <figure className="px-10 pt-10">
                  <img
                    src={profile.photo.url}
                    alt="Profile Avatar"
                    className="rounded-xl"
                  />
                </figure>
                {editProfile && (
                  <UploadImages handleImage={handleUpdateProfileImage} />
                )}
                <button
                  className="btn btn-primary mt-3 w-40 m-auto"
                  onClick={() => setEditProfile(!editProfile)}
                >
                  {editProfile ? "Cancel" : "Edit Profile"}
                </button>
                <div className="card-body items-start text-center">
                  <h2 className="card-title mb-2">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> {profile.emailId}
                  </p>
                  {profile.age !== undefined && profile.age !== null && (
                    <p className="text-sm text-gray-700">
                      <strong>Age:</strong> {profile.age}
                    </p>
                  )}
                  {profile.gender && (
                    <p className="text-sm text-gray-700">
                      <strong>Gender:</strong> {profile.gender}
                    </p>
                  )}
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">
                      College/University:
                    </h3>
                    <p className="text-sm text-gray-600">
                      {profile.college ? profile.college : "Not Entered"}
                    </p>
                  </div>
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">About:</h3>
                    <p className="text-sm text-gray-600">
                      {profile.about ? profile.about : "Not Entered"}
                    </p>
                  </div>
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">Skills:</h3>
                    <p className="text-sm text-gray-600">
                      {profile.skills.length > 0 && profile.skills.join(", ")}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Joined: {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last Updated:{" "}
                    {new Date(profile.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        profileState && (
          <div className="flex flex-col w-96 justify-center items-center m-auto mt-5">
            <form className="flex flex-col">
              <figure className="px-10 pt-10 mb-10">
                <img
                  src={profileState.photo.url}
                  alt="Profile Avatar"
                  className="rounded-xl"
                />
              </figure>
              {editProfile && (
                <UploadImages handleImage={handleUpdateProfileImage} />
              )}
              <div className="input">
                <label className="p-2">First Name</label>
                <input
                  className="border-1"
                  type="text"
                  value={profileState.firstName || ""}
                  onChange={(e) => {
                    setProfileState((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          firstName: e.target.value.trim(),
                        };
                      }
                      return null;
                    });
                  }}
                />
              </div>
              <div className="input">
                <label className="p-2">Last Name</label>
                <input
                  className="border-1"
                  type="text"
                  value={profileState.lastName || ""}
                  onChange={(e) => {
                    setProfileState((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          lastName: e.target.value.trim(),
                        };
                      }
                      return null;
                    });
                  }}
                />
              </div>
              <div className="input">
                <label className="p-2">Age</label>
                <input
                  className="border-1"
                  type="text"
                  value={profileState.age || ""}
                  onChange={(e) => {
                    setProfileState((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          age: e.target.value,
                        };
                      }
                      return null;
                    });
                  }}
                />
              </div>
              <div className="input">
                <label className="p-2">College</label>
                <input
                  className="border-1"
                  type="text"
                  value={profileState.college || ""}
                  onChange={(e) => {
                    setProfileState((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          college: e.target.value.trim(),
                        };
                      }
                      return null;
                    });
                  }}
                />
              </div>
              <div className="input">
                <label className="p-2">About</label>
                <input
                  className="border-1"
                  type="text"
                  value={profileState.about || ""}
                  onChange={(e) => {
                    setProfileState((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          about: e.target.value.trim(),
                        };
                      }
                      return null;
                    });
                  }}
                />
              </div>
              <div className="input">
                <label className="p-2">Skills (csv)</label>
                <input
                  className="border-1"
                  type="text"
                  value={profileState.skills.join(",") || ""}
                  onChange={(e) => {
                    setProfileState((prev) => {
                      if (prev) {
                        return {
                          ...prev,
                          skills: e.target.value
                            .split(",")
                            .map((item) => item.trim()),
                        };
                      }
                      return null;
                    });
                  }}
                />
              </div>
            </form>
            <button
              className="btn btn-primary mt-3 w-40 m-auto"
              onClick={() => setEditProfile(!editProfile)}
            >
              Cancel
            </button>
            {editProfile ? (
              <button
                className="btn btn-primary mt-3 w-40 m-auto"
                onClick={() => handleProfileUpdate()}
              >
                Submit
              </button>
            ) : null}
          </div>
        )
      )}
    </div>
  );
};

export default EditProfile;

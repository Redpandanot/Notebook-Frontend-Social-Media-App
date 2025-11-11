import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { getProfile, removeUser } from "../../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import useProfileNavigation from "../../hooks/useProfileNavigation";
import { ProfileDetail } from "../../Types/type";
import { useQueryClient } from "@tanstack/react-query";

interface NavbarPropType {
  handleSidebarClicked: () => void;
}

const Navbar = ({ handleSidebarClicked }: NavbarPropType) => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<ProfileDetail[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((store) => store.profile);
  const { handleNavigateToProfile } = useProfileNavigation();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    try {
      axios.get(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      window.alert("from navbar" + error);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length === 0) return;
    setLoading(true);
    try {
      const response = await axios.get(
        BASE_URL + "/search?query=" + searchQuery,
        {
          withCredentials: true,
        }
      );
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      window.alert(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(search);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile, dispatch]);

  return (
    <div className="navbar bg-base-100 shadow-sm justify-center">
      <div className="absolute left-3">
        <button
          className="btn btn-square btn-ghost"
          onClick={handleSidebarClicked}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
        </button>
      </div>
      <div className="absolute left-15 hidden md:block">
        <button className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          Notebook
        </button>
        <label className="btn btn-ghost swap swap-rotate ml-2">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            value="halloween"
          />

          {/* sun icon */}
          <svg
            className="swap-off h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div className="rounded-2xl">
        <div className="flex gap-2 w-[300px]">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value.trim())}
              onFocus={() => setDisplay(true)}
              onBlur={() => setDisplay(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (search.length <= 3) return;
                  setDisplay(false);
                  navigate("/search/" + search);
                }
              }}
            />
          </label>
        </div>
        {display && search !== "" && (
          <ul className="list rounded-box shadow-md z-10 bg-base-200 absolute w-60">
            {loading ? (
              <span className="loading loading-ring loading-xl m-auto"></span>
            ) : (
              results.map((item) => {
                return (
                  <li className="list-row" key={item._id}>
                    <div
                      className="cursor-pointer hover:bg-neutral hover:text-secondary-content rounded-box p-2 w-50"
                      onClick={() => {
                        setDisplay(false);
                        handleNavigateToProfile(item._id);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {item.firstName} {item.lastName}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
      {profile && (
        <div className="dropdown dropdown-end flex-none absolute right-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Profile Image" src={profile.photo?.url} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-10 mt-1 w-52 p-2 bg-base-200"
          >
            <li
              className="cursor-pointer hover:bg-neutral hover:text-secondary-content rounded-box p-1"
              onClick={() => navigate("/profile/" + profile._id)}
            >
              Profile
            </li>
            <li
              className="cursor-pointer hover:bg-neutral hover:text-secondary-content rounded-box p-1"
              onClick={() => {
                queryClient.clear();
                handleLogout();
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

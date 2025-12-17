import { getProfile, removeUser } from "../../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import useProfileNavigation from "../../hooks/useProfileNavigation";
import { useQueryClient } from "@tanstack/react-query";
import ThemeController from "../UtillComponents/ThemeController";
import { logout } from "../../api/auth";
import { useSearch } from "../../hooks/useSearch";

interface NavbarPropType {
  handleSidebarClicked: () => void;
}

const Navbar = ({ handleSidebarClicked }: NavbarPropType) => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((store) => store.profile);
  const { handleNavigateToProfile } = useProfileNavigation();
  const queryClient = useQueryClient();

  // 🔍 React Query search hook
  const {
    data: results = [],
    refetch,
    isLoading,
    isFetching,
  } = useSearch(search);

  // 🔍 Debounce search
  useEffect(() => {
    if (search.trim().length < 3) return;

    const timer = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, refetch]);

  // Load profile if missing
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile, dispatch]);

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.clear();
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      window.alert("from navbar: " + error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm justify-center relative">
      {/* Sidebar toggle */}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="absolute left-15 hidden md:block">
        <button className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          Notebook
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl">
        <div className="flex gap-2 lg:w-[400px]">
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

        {/* Search dropdown */}
        {display && search !== "" && (
          <ul className="list rounded-box shadow-md z-10 bg-base-200 absolute w-60">
            {isLoading ? (
              <span className="loading loading-ring loading-xl m-auto"></span>
            ) : (
              results.map((item) => (
                <li className="list-row" key={item._id}>
                  <div
                    className="cursor-pointer hover:bg-neutral hover:text-secondary-content rounded-box p-2 w-40"
                    onClick={() => {
                      setDisplay(false);
                      handleNavigateToProfile(item._id);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {item.firstName} {item.lastName}
                  </div>
                </li>
              ))
            )}
            {!isLoading && isFetching && (
              <span className="loading loading-ring loading-xl m-auto"></span>
            )}
          </ul>
        )}
      </div>

      {/* Right-side profile dropdown */}
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
              Home
            </li>
            <li
              className="cursor-pointer hover:bg-neutral hover:text-secondary-content rounded-box p-1"
              onClick={handleLogout}
            >
              Logout
            </li>
            <li className="flex flex-row items-center p-1 gap-5">
              Theme <ThemeController />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

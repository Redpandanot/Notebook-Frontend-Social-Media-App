import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { getProfile, removeUser } from "../../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import useProfileNavigation from "../../hooks/useProfileNavigation";
import { ProfileDetail } from "../FriendAndRequest/type";

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
      <div className="absolute left-0">
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
      <div
        className="absolute left-10 hidden md:block"
        onClick={() => navigate("/")}
      >
        <a className="btn btn-ghost text-xl">Notebook</a>
      </div>
      <div className="rounded-2xl w-60">
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
            />
          </label>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (search.length <= 3) return;
              navigate("/search/" + search);
            }}
          >
            Search
          </button>
        </div>
        {display && search !== "" && (
          <ul className="list rounded-box shadow-md z-10 bg-neutral absolute w-60">
            {loading ? (
              <span className="loading loading-ring loading-xl m-auto"></span>
            ) : (
              results.map((item) => {
                return (
                  <li className="list-row" key={item._id}>
                    <div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setDisplay(false);
                          handleNavigateToProfile(item._id);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {item.firstName} {item.lastName}
                      </div>
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
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img alt="Navbar component with Images" src={profile.photo.url} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow hover:cursor-pointer bg-amber-50"
          >
            <li onClick={() => navigate("/profile/" + profile._id)}>Profile</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

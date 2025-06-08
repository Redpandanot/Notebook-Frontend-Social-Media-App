import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { getProfile } from "../store/slices/profileSlice";
import { checkAndFetchProfile } from "../utils/checkAndFetchProfile";
import SidebarMenu from "../components/SidebarMenu";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const profile = useAppSelector((store) => store.profile);
  const dispatch = useAppDispatch();
  const [sideNavigationMenu, setSideNavigationMenu] = useState<boolean>(false);

  const fetch = useCallback(
    async () => checkAndFetchProfile(profile, setLoading, dispatch, getProfile),
    [profile, dispatch]
  );

  useEffect(() => {
    fetch();
  }, [profile, fetch]);

  useEffect(() => {
    if (!loading && !profile) {
      navigate("/login");
    }
  }, [loading, profile, navigate]);

  const handleSidebarClicked = () => {
    setSideNavigationMenu(!sideNavigationMenu);
  };

  return (
    <>
      {!loading && profile ? (
        <div className="flex">
          <div>
            {sideNavigationMenu && (
              <SidebarMenu handleSidebarClicked={handleSidebarClicked} />
            )}
          </div>
          <div className="w-full">
            <Navbar handleSidebarClicked={handleSidebarClicked} />
            <Outlet />
          </div>
        </div>
      ) : (
        <ProfilePostSkeleton />
      )}
    </>
  );
};

export default Home;

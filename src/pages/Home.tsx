import { useCallback, useEffect, useRef, useState } from "react";
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
  const mainScrollRef = useRef<HTMLDivElement | null>(null);

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
        <div className="flex flex-col h-screen">
          <Navbar handleSidebarClicked={handleSidebarClicked} />
          <div className="flex flex-1 overflow-hidden">
            {sideNavigationMenu && (
              <div className="w-64 bg-base-200 shadow-xl overflow-y-auto">
                <SidebarMenu handleSidebarClicked={handleSidebarClicked} />
              </div>
            )}
            <div ref={mainScrollRef} className="flex-1 overflow-y-auto">
              <Outlet context={{ mainScrollRef }} />
            </div>
          </div>
        </div>
      ) : (
        <ProfilePostSkeleton />
      )}
    </>
  );
};

export default Home;

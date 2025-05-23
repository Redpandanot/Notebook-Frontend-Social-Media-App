import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { getProfile } from "../store/slices/profileSlice";
import { checkAndFetchProfile } from "../utils/checkAndFetchProfile";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const profile = useAppSelector((store) => store.profile);
  const dispatch = useAppDispatch();

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

  return (
    <>
      {!loading && profile ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Home;

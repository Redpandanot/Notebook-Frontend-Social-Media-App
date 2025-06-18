import { useNavigate } from "react-router-dom";
import { handleVisitProfile } from "../utils/handleVisitProfile";

const useProfileNavigation = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = async (userId: string) => {
    try {
      const response = await handleVisitProfile(userId);
      navigate("/profile/" + response.data._id);
    } catch (error) {
      window.alert(error);
    }
  };
  return {
    handleNavigateToProfile,
  };
};

export default useProfileNavigation;

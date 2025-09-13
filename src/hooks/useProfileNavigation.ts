import { useNavigate } from "react-router-dom";

const useProfileNavigation = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = async (userId: string) => {
    try {
      navigate("/profile/" + userId);
    } catch (error) {
      window.alert(error);
    }
  };
  return {
    handleNavigateToProfile,
  };
};

export default useProfileNavigation;

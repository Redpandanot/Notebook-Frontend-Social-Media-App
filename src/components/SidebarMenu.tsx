import { useNavigate } from "react-router-dom";

interface SidebarPropType {
  handleSidebarClicked: () => void;
}

const SidebarMenu = ({ handleSidebarClicked }: SidebarPropType) => {
  const navigate = useNavigate();
  return (
    <ul className="menu bg-base-200 rounded-box w-64 pt-5">
      <li
        onClick={() => {
          handleSidebarClicked();
          navigate("/profile/edit");
        }}
      >
        <a>Edit Profile</a>
      </li>
      <li
        onClick={() => {
          handleSidebarClicked();
          navigate("/friends");
        }}
      >
        <a>Friends</a>
      </li>
      <li
        onClick={() => {
          handleSidebarClicked();
          navigate("/followers");
        }}
      >
        <a>Followers</a>
      </li>
      <li
        onClick={() => {
          handleSidebarClicked();
          navigate("/following");
        }}
      >
        <a>Following</a>
      </li>
      <li
        onClick={() => {
          handleSidebarClicked();
          navigate("/friend-requests");
        }}
      >
        <a>Friend Requests</a>
      </li>
      <li
        onClick={() => {
          handleSidebarClicked();
          navigate("/chat");
        }}
      >
        <a>Chat</a>
      </li>
    </ul>
  );
};

export default SidebarMenu;

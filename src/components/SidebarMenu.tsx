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
      <li>
        <a>Item 2</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  );
};

export default SidebarMenu;

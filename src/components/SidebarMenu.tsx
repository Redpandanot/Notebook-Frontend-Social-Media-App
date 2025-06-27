import { useNavigate } from "react-router-dom";

interface SidebarPropType {
  handleSidebarClicked: () => void;
}

const SidebarMenu = ({ handleSidebarClicked }: SidebarPropType) => {
  const navigate = useNavigate();
  return (
    <div className="drawer flex flex-col justify-start z-10 bg-neutral h-screen pt-3">
      <div>
        <button
          className="btn btn-square btn-ghost ml-3"
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
      <div>
        <ul className="menu w-80 p-4 text-secondary-content">
          {/* Sidebar content here */}
          <li
            className=" hover:cursor-pointer"
            onClick={() => {
              handleSidebarClicked();
              navigate("/profile/edit");
            }}
          >
            Edit Profile
          </li>
          <li>Sidebar Item 2</li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;

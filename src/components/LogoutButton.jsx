import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggegInuser");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className=" text-white px-4 py-4  rounded-lg"
    >
    <Icon className="font-bold  pt-0" icon="streamline-pixel:interface-essential-signout-logout" width="24px" height="24px" />
    </button>
  );
};

export default LogoutButton;
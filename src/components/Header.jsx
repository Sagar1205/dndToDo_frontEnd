import React from "react";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const { currentUser, setCurrentUser } = useUser();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed w-full">
      <div
        className="justify-between flex px-12 bg-gray-400 py-2 text-lg"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div>Welcome {currentUser.username.toUpperCase()}</div>
        <button
          onClick={handleLogout}
          className="hover:bg-slate-500 py-[0.7] rounded-xl px-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

"use client";
import * as React from "react";
import { FaHistory } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useGlobalContext } from "../../../ContextAPI/GlobalContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function UserProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { dispatch } = useGlobalContext();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Your are logged out");
  };
 
  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded"
      >
        My Profile
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
      
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

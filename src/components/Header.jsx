"use client";
import { useState } from "react";
import Link from "next/link";
import AuthModal from "./customModals/AuthModal";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useGlobalContext } from "../../ContextAPI/GlobalContext";
import UserProfile from "./User/UserProfile";

const Header = () => {
  const [isAuthModal, setAuthModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useGlobalContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">
            <span className="hover:text-blue-300">Admin Dashboard</span>
          </Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <HiOutlineMenuAlt3 className="w-6 h-6" />
        </button>

        <nav
          className={`md:flex md:space-x-4 ${
            isOpen ? "flex" : "hidden"
          } md:block`}
        >
          <Link href="dashboard/view-rooms">
            <span className="block py-2 md:py-0 hover:text-blue-300">
              View Rooms
            </span>
          </Link>
        </nav>

        {/* Login Button */}
        {state && state.user ? (
          <UserProfile />
        ) : (
          <div>
            <button
              onClick={() => setAuthModal(true)}
              className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Optional mobile menu styling */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link href="/dashboard">
              <span className="hover:text-blue-300">Dashboard</span>
            </Link>         
           
          </nav>
        </div>
      )}
      {isAuthModal && (
        <AuthModal isAuthModal={isAuthModal} setAuthModal={setAuthModal} />
      )}
    </div>
  );
};

export default Header;

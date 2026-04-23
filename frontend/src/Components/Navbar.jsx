import React, { useState } from "react";
import Svg from "../assets/react.svg";
import { Button } from "@/Components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/Store";
import { Loader } from "lucide-react";
const Navbar = () => {
  const { AuthUser, Logout, islogginOut, setProfile, profileId } =
    useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const onSubmitProfileHandler = (profileId) => {
    if (!profileId) return;
    setProfile(profileId);
    navigate(`/${profileId}`);
  };
  if (islogginOut) {
    return (
      <Loader className="animate-spin w-10 h-10 absolute left-1/2 bottom-1/2"></Loader>
    );
  }
  return (
    <>
      <nav className=" shadow-md bg-base-100 border-b border-base-300 ">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={AuthUser?.profilePic || Svg}
              className="h-8 rounded-full"
              alt="App Logo"
            />
            <span className="text-2xl font-bold text-base-700 dark:text-indigo-400">
              {AuthUser?.fullName || "BlogPost"}
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link className="btn btn-primary text-base-100" to="/themes">
              Themes
            </Link>

            {AuthUser ? (
              <>
                <button onClick={Logout} className=" btn btn-ghost">
                  Logout
                </button>
                <Link to="/community" className="btn btn-ghost">
                  Community
                </Link>
                <button
                  onClick={() => {
                    onSubmitProfileHandler(AuthUser.userId);
                  }}
                  className="btn btn-ghost"
                >
                  Manage Videos
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-ghost">
                  Register
                </Link>
              </>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none dark:text-gray-300 dark:hover:text-indigo-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            {AuthUser?.fullName || "My App"}
          </span>
          <button
            onClick={closeSidebar}
            className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 flex flex-col space-y-4">
          <Link className="btn btn-ghost " to="/themes">
            Themes
          </Link>
          {AuthUser ? (
            <>
              <button onClick={Logout} className="btn btn-ghost">
                Logout
              </button>

              <button
                onClick={() => {
                  onSubmitProfileHandler(AuthUser.userId);
                  closeSidebar();
                }}
                className="btn btn-ghost"
              >
                Manage Videos
              </button>
              <Link to="/community" className="btn btn-ghost">
                Community
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeSidebar}
                className="text-gray-800 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeSidebar}
                className="text-gray-800 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Navbar;

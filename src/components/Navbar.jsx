import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User, ChevronDown, LogOut, Settings } from "lucide-react";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Expense", path: "/expense" },
    { name: "Pricing", path: "/pricing" },
    { name: "Overview", path: "/overview" },
    { name: "Transactions", path: "/transactions" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl ml-6 md:text-4xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition-colors duration-300"
          >
            Finance<span className="text-blue-800">+</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="relative text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 group"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-6">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span>
                          {user?.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "U"}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        profileDropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
                            {user?.profileImage ? (
                              <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span>
                                {user?.name
                                  ? user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                  : "U"}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {user?.name || "User"}
                            </p>
                            <p className="text-sm text-blue-100">
                              {user?.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <User className="w-5 h-5 mr-3 text-gray-500" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Settings className="w-5 h-5 mr-3 text-gray-500" />
                          <span>Settings</span>
                        </Link>
                        <div className="border-t border-gray-200"></div>
                        <button
                          onClick={() => {
                            logout();
                            navigate("/login");
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-gray-100 transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-6 pt-4 space-y-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block text-2xl font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-xl"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-xl"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 rounded-full font-semibold text-xl"
                  >
                    <User className="w-5 h-5 mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold text-xl"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;

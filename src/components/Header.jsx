import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie"; // Import Cookies for token management
import { Axios } from "../../services/AxiosInstance";
// import jwtDecode from "jwt-decode"; // Correct import for jwt-decode

const Header = () => {
  const [role, setRole] = useState(null); // State to hold user role
  const [userName, setUserName] = useState(""); // State to hold user name
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      // console.log(token);
      if (!token) {
        setUserName("");
      }
      else{
        try {
          const response = await Axios.get("/current");


          if (response.data) {
            setRole(response.data.data.role);
            setUserName(response.data.data.username); // Set user name from response
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setRole(null);
        }
       
      }
    };

    fetchCurrentUser();
  }, [token]);

  return (
    <header className="bg-[#F18455] shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Tastylicious Logo"
            className="w-12 h-auto mr-3"
          />
          <NavLink
            to="/"
            className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
          >
            <span className="text-white text-3xl font-extrabold tracking-wide">
              Tastylicious
            </span>
          </NavLink>
        </div>
        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          <NavLink
            to="/"
            className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
          >
            Recipes
          </NavLink>
          {/* <NavLink
            to="/meal-plan"
            className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
          >
            Meal Planner
          </NavLink> */}

          <NavLink
            to="/signup"
            className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
          >
            SignUp
          </NavLink>

          {/* Add Recipe Link (visible only to admins) */}
          {role === "admin" && (
            <NavLink
              to="/createRecipe"
              className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
            >
              Add Recipe
            </NavLink>
          )}

          {/* User Profile Link */}
          <NavLink
            to="/user/profile"
            className="text-white text-lg hover:text-gray-200 transition-colors duration-300 flex items-center"
          >
            <FaBars className="text-2xl" />
            {/* Conditionally render username only if user is logged in */}
            {userName && <span className="ml-2">{userName}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

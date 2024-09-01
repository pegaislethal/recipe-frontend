import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
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
            {" "}
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
          <NavLink
            to="/meal-plan"
            className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
          >
            Meal Planner
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white text-lg font-medium hover:text-gray-200 transition-colors duration-300"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/user/profile"
            className="text-white text-lg hover:text-gray-200 transition-colors duration-300"
          >
            <FaBars className="text-2xl" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import user from "../../assets/user.png";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const UserProfile = () => {
 
  return (
    <>
    <Header/>
    <div className="container mx-auto p-4 max-w-screen-md">
      <div className="text-center mb-8">
        <li><NavLink to='/'><FaArrowLeft /></NavLink></li>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h1>
        <p className="text-gray-600">This is a user profile page.</p>
      </div>

      <div className="flex items-start mb-8">
        <div className="mr-8">
          <img
            src={user}
            alt="User Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
        </div>
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Basic Info</h2>
              <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Username:</strong> <span>John Doe</span>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> <span>john.doe@example.com</span>
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> <span>123-456-7890</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address</h2>
            <p className="text-gray-700">
              <strong>City:</strong> <span>New York</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
            <p className="text-gray-700 mb-2">
              <strong>Change Password:</strong> <span className="text-blue-500 cursor-pointer">Click Here</span>
            </p>
          
          </div>

        
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UserProfile;

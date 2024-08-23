import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import food from "../../assets/food.jpg";

const SignUpPage = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="border border-black w-[550px] p-6 flex">
          <img
            src={food}
            alt="Sign Up"
            className="h-[500px] w-48 mr-6 object-cover" // Increased the height to 500px
          />
          <div className="flex-1">
            <h1 className="text-center text-xl mb-3">Sign Up</h1>
            <form className="space-y-3">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select user type</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Chef</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Confirm your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F58C5F] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              Already have an account?
              <a href="/login" className="text-blue-600 hover:underline ml-1">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;

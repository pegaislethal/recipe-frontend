import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import food from "../../assets/food.jpg";

const LoginPage = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="border border-black w-[550px] p-6 flex">
          <img
            src={food}
            alt="Login"
            className="h-[500px] w-48 mr-6 object-cover" // Matching image size with SignUpPage
          />
          <div className="flex-1">
            <h1 className="text-center text-xl mb-3">Login</h1>
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
              <button
                type="submit"
                className="w-full bg-[#F58C5F] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              Don't have an account?
              <a href="/signup" className="text-blue-600 hover:underline ml-1">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies
import Header from "../Header";
import Footer from "../Footer";
import food from "../../assets/food.jpg";
import { Axios } from "../../../services/AxiosInstance";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // useNavigate hook for redirection

  const onSubmit = async (data) => {
    try {
      // Determine the endpoint based on the selected role
      const endpoint =
        data.role === "admin"
          ? "/admin/login"
          : "/users/login";

      // Directly send the login request to the appropriate endpoint
      const response = await Axios.post(endpoint, {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        Cookies.set("token", response.data.token); // Store the token
        navigate("/recipes"); // Redirect to the recipes page
      } else {
        alert("Login failed: " + response.data.message); // Show error message
      }
    } catch (err) {
      console.error("Login error:", err);

      // Detailed error handling
      if (err.response) {
        console.error("Error response data:", err.response.data);
        alert(`Login failed: ${err.response.data.message}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        alert("Login failed: No response from the server.");
      } else {
        console.error("Error message:", err.message);
        alert(`Login failed: ${err.message}`);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="border border-black w-[550px] p-6 flex">
          <img
            src={food}
            alt="Login"
            className="h-[500px] w-48 mr-6 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-center text-xl mb-3">Login</h1>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
             
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  className={`mt-1 block w-full p-2 border rounded-md text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  {...register("role", { required: "Role is required" })}
                  id="role"
                  className={`mt-1 block w-full p-2 border rounded-md text-sm ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="chef">Chef</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  id="password"
                  className={`mt-1 block w-full p-2 border rounded-md text-sm ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
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

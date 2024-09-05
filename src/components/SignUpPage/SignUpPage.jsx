import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies
import Header from "../Header";
import Footer from "../Footer";
import food from "../../assets/food.jpg";
import { Axios } from "../../../services/AxiosInstance";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Import useNavigate for redirection

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);
    try {
      let response;

      if (data.role === "admin") {
        response = await Axios.post("/admin/signup", data);
      } else {
        response = await Axios.post("/users/signup", data);
      }

      console.log("Form Submitted Successfully:", response.data);

      if (response.data.success) {
        Cookies.set("token", response.data.token); // Store the token
        navigate("/verifyOtp"); // Redirect to the recipes page
      } else {
        alert("Signup failed: " + response.data.message); // Show error message
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response data:", error.response.data);
        alert(`Signup failed: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        alert("Signup failed: No response from the server.");
      } else {
        // Something else caused the error
        console.error("Error message:", error.message);
        alert(`Signup failed: ${error.message}`);
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
            alt="Sign Up"
            className="h-[500px] w-48 mr-6 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-center text-xl mb-3">Sign Up</h1>
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
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  {...register("name", {
                    required: "Username is required",
                  })}
                  type="text"
                  id="username"
                  className={`mt-1 block w-full p-2 border rounded-md text-sm ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
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
                  <option value="">Select user type</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Chef</option>
                  <option value="user">User</option>
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type="password"
                  id="confirm-password"
                  className={`mt-1 block w-full p-2 border rounded-md text-sm ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
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

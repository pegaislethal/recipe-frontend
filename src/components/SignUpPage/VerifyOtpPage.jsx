import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { Axios } from "../../../services/AxiosInstance";

const VerifyOtpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("/verifyOtp", data); // Use unified route

      if (response.data.success) {
        alert("OTP Verified Successfully!");
        navigate("/login"); // Redirect to login on success
      } else {
        alert("OTP verification failed: " + response.data.message);
      }
    } catch (error) {
      console.error("There was an error verifying the OTP!", error);
      if (error.response) {
        alert(`Verification failed: ${error.response.data.message}`);
      } else if (error.request) {
        alert("Verification failed: No response from the server.");
      } else {
        alert(`Verification failed: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="border border-black w-[350px] p-6 flex flex-col items-center">
          <h1 className="text-center text-xl mb-4">Verify OTP</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
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
              <label className="block text-sm font-medium text-gray-700" htmlFor="otp">
                OTP Code
              </label>
              <input
                {...register("otp", { required: "OTP is required" })}
                type="text"
                id="otp"
                maxLength="6"
                className={`mt-1 block w-full p-2 border rounded-md text-sm ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your OTP"
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="role">
                Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                id="role"
                className={`mt-1 block w-full p-2 border rounded-md text-sm ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#F58C5F] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyOtpPage;

import React,{useState,useEffect} from "react";
import user from "../../assets/user.png";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Axios } from "../../../services/AxiosInstance";
import Footer from "../Footer";
import Header from "../Header";
import Cookies from "js-cookie";

const UserProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [role, setRole] = useState("user"); // State to hold user role
  const [userName, setUserName] = useState(""); // State to hold user name
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");


  const token = Cookies.get("token");

useEffect (()=>{
  const getUser = async ()=>{
    console.log(token);
      if (!token) {
        console.log("There is no user loginned i.e, no token ")
        setInfo("Please sign in")

      }else{
        try {
          const response = await Axios.get("/current");

          if (response.data) {
            setUserName(response.data.data.username);
            setEmail(response.data.data.email); 
            setRole(response.data.data.role)
          }
          else{
            console.log("Error fetching data")
          }
        } catch (error) {
          console.error("Error :", error);
        
        }
       
      }
      }
      getUser();
  
},[token] )

  // Logout function
  const handleLogout = () => {
    // Clear any authentication tokens (if using local storage)
    localStorage.removeItem("token"); // Adjust based on your token storage method
    Cookies.remove("token"); // Clear token from cookies


    // Navigate to the login page
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-screen-md">
        <div className="text-center mb-8">
          <li>
            <NavLink to='/'>
              <FaArrowLeft />
            </NavLink>
          </li>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h1>
          <p className="text-red-600">{info}</p>
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
                {/* <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                  Edit Profile
                </button> */}
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Username:</strong> <span>{userName}</span>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> <span>{email}</span>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Role:</strong> <span>{role}</span>
              </p>
             
            </div>

            {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address</h2>
              <p className="text-gray-700">
                <strong>City:</strong> <span>New York</span>
              </p>
            </div> */}

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
              <p className="text-gray-700 mb-2">
                <strong>Change Password:</strong> <span className="text-blue-500 cursor-pointer">Click Here</span>
              </p>
            </div>

            {/* Logout button */}
            <div className="text-center mb-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;

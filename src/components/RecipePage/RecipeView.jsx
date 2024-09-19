import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Axios } from "../../../services/AxiosInstance";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Cookies from "js-cookie"; // Import Cookies for token management

const RecipeView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [role, setRole] = useState(null); // State to hold user role
  const [userName, setUserName] = useState("");


  const getReviews = async (id) => {
    try {
      const response = await Axios.get(`/recipes/reviews/${id}`);
      if (response.data) {
        setReviews(response.data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Function to fetch the current user and recipe data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = Cookies.get("token"); // Retrieve token inside the effect
      if (!token) {
        setUserName("");
      } else {
        try {
          const response = await Axios.get("/current");
          if (response.data) {
            setUserName(response.data.data.username);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const getRecipeByID = async () => {
      try {
        const response = await Axios.get(`/recipes/${params.id}`);
        const currentUser = await Axios.get("/current");
        setRole(currentUser?.data.data.role);
        setRecipeData(response.data);
      } catch (err) {
        setError("Failed to fetch recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

   
    getRecipeByID();
    getReviews(params.id);
    fetchCurrentUser();
  }, [params.id]);

  // Submit review function
  const submitReview = async () => {
    const token = Cookies.get("token"); // Retrieve token from cookies here
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      await Axios.post(
        `/recipes/reviews/${params.id}`,
        {
          rating: newRating,
          reviewText: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      // Fetch updated reviews after submission
      await getReviews(params.id);

      // Reset rating and comment input
      setNewRating(0);
      setNewComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };
  // Delete recipe function
  const deleteRecipe = async () => {
    try {
      console.log(`${params.id}`);
      await Axios.delete(`/recipes/${params.id}`);
      alert("Recipes deleted successfully");
      navigate("/recipes");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const deleteReview = async (reviewId) => { // Pass the review ID as an argument
    const token = Cookies.get("token"); // Retrieve token from cookies
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
    
    try {
      // Call delete API with the review ID
      const response = await Axios.delete(`/recipes/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      });
      
      alert(response.data.message); // Show success message from server response
      // Optionally, you may want to refresh the reviews list here
    } catch (err) {
      console.error("Error deleting review:", err);
      // You can also display an alert or error message to the user
      alert("Failed to delete review. Please try again.");
    }
  };
  

  const updateRecipe = async () => {
    navigate(`/recipes/edit/${params.id}`);
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Header />
      <p className="ml-20 mt-5 text-[20px]">
        <NavLink to="/recipes">
          <FaArrowLeft />
        </NavLink>
      </p>
      <div className="container mx-auto mt-11 p-4 max-w-screen-lg">
        {/* Recipe details */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={recipeData.Image}
            alt="Momo"
            className="w-full md:w-1/2 max-w-md rounded-lg shadow-md mb-6"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start mb-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-red-600 mb-2">
              {recipeData.recipeTitle}
            </h1>
            <p className="text-yellow-500 text-lg font-semibold mb-4">
              {recipeData.recipeDesc}
            </p>
          </div>
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md text-gray-800">
            <p className="text-lg mb-2">
              <strong>Preparation Time:</strong> {recipeData.preparationTime}
            </p>
            <p className="text-lg">
              <strong>Chef:</strong> {recipeData.Chef}
            </p>
            <p className="text-lg">
              <strong>Calorie:</strong> {recipeData.Calorie} calories
            </p>
          </div>
        </div>

        {/* Ingredients and Directions */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="flex-1 md:mr-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
              {recipeData.Ingredients &&
                recipeData.Ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
          </div>
          <div className="flex-1 md:ml-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Directions
            </h2>
            <ol className="list-decimal list-inside text-gray-700 text-lg leading-relaxed">
              {recipeData.Directions &&
                recipeData.Directions.map((direction, index) => (
                  <li key={index}>{direction}</li>
                ))}
            </ol>
          </div>
        </div>

        <div className="text-center text-gray-700 italic">
          <p>Serve and Enjoy!</p>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="border-t border-gray-300 py-4 text-lg"
              >
                <p>
                  <strong>
                    {userName && (
                      <span className="ml-2 capitalize ">{userName}</span>
                    )}
                    :
                  </strong>{" "}
                  {review?.reviewText || "No comment"}{role === "admin" && (
            <button
              onClick={()=>deleteReview(review._id)}
              className="bg-red-500 text-white m-2 px-4 py-2 rounded-md right-0"
            >
              Delete Reviews
            </button>
          )}
                </p>
                <div className="flex">
                
                  <Rating
                    name="read-only"
                    value={review?.rating || 0}
                    readOnly
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  {/* <Rating  readonly /> */}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave one!</p>
          )}
        </div>

        {/* Submit Review Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Rating:</label>
            <div className="flex">
            <Rating
        name="simple-controlled"
        value={newRating}
        onChange={(event, newValue) => {
          setNewRating(newValue);
        }}
      />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Comment:</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <button
            onClick={submitReview}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit Review
          </button>

          {/* Delete Button */}
          {role === "admin" && (
            <button
              onClick={deleteRecipe}
              className="bg-red-500 text-white m-2 px-4 py-2 rounded-md"
            >
              Delete Recipe
            </button>
          )}

          {/* Update Button */}
          {role === "admin" && (
            <button
              onClick={updateRecipe}
              className="bg-green-500 text-white m-2 px-4 py-2 rounded-md"
            >
              Update Recipe
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeView;

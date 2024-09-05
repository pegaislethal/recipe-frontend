import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import momo from "../../assets/momoimage.jpg";
import { Axios } from "../../../services/AxiosInstance";
import { useParams, NavLink, useNavigate } from "react-router-dom"; // Add useNavigate
import { FaArrowLeft } from "react-icons/fa";
import { Rating } from "@material-tailwind/react";

const RecipeView = () => {
  const params = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getRecipeByID = async () => {
      try {
        const response = await Axios.get(`/recipes/${params.id}`);
        setRecipeData(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const getReviews = async () => {
      try {
        const response = await Axios.get(`/recipes/${params.id}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    getRecipeByID();
    getReviews();
  }, [params.id]);

  // Submit review function
  const submitReview = async () => {
    try {
      await Axios.post(`/recipes/${params.id}/reviews`, {
        rating: newRating,
        comment: newComment,
      });
      const updatedReviews = await Axios.get(`/recipes/${params.id}/reviews`);
      setReviews(updatedReviews.data);
      setNewRating(0);
      setNewComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  // Delete recipe function
  const deleteRecipe = async () => {
    try {
      await Axios.delete(`/recipes/${params.id}`);
      navigate("/recipes"); 
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const updateRecipe = async () => {
    navigate(`/recipe/${params.id}/edit`);
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
            src={momo}
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
              <strong>Calorie:</strong> 209 calories
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600">
            Add in your meal plan
          </button>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Directions</h2>
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
              <div key={index} className="border-t border-gray-300 py-4 text-lg">
                <p>
                  <strong>{review.name}:</strong> {review.comment}
                </p>
                <div className="flex">
                  <Rating value={review.rating} readonly />
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
              <Rating value={newRating} onChange={setNewRating} />
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
          <button
            onClick={deleteRecipe}
            className="bg-red-500 text-white m-2 px-4 py-2 rounded-md"
          >
            Delete Recipe
          </button>
          {/*Update */ }
          <button
            onClick={updateRecipe}
            className="bg-red-500 text-white m-2 px-4 py-2 rounded-md"
          >
            Update Recipe
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeView;

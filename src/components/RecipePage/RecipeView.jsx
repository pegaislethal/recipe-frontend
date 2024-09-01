import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import momo from "../../assets/momoimage.jpg";
import { Axios } from "../../../services/AxiosInstance";
import { useParams } from "react-router-dom";

const RecipeView = () => {
  const params = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  useEffect(() => {
    const getRecipeByID = async () => {
      try {
        const response = await Axios.get(`/recipes/${params.id}`); 
        setRecipeData(response.data); 
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false in both success and error cases
      }
    };

    getRecipeByID(); 
  }, [params.id]);


  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Header />

      <div className="container mx-auto mt-11 p-4 max-w-screen-lg">
        <div className="flex flex-col items-center mb-8">
          <img
            src={momo}
            alt="Momo"
            className="w-full md:w-1/2 max-w-md rounded-lg shadow-md mb-6"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start mb-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-red-600 mb-2">{recipeData.recipeTitle}</h1>
            <p className="text-yellow-500 text-lg font-semibold mb-4">
              {recipeData.recipeDesc}
            </p>
          </div>
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md text-gray-800">
            <p className="text-lg mb-2">
              <strong>Preparation Time:</strong> {recipeData.preparationTime}
            </p>
            <p className="text-lg">
              <strong>Chef:</strong>{recipeData.Chef}
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

        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="flex-1 md:mr-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
              {recipeData.Ingredients && recipeData.Ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1 md:ml-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Directions</h2>
            <ol className="list-decimal list-inside text-gray-700 text-lg leading-relaxed">
              {recipeData.Directions && recipeData.Directions.map((direction, index) => (
                <li key={index}>{direction}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="text-center text-gray-700 italic">
          <p>Serve and Enjoy!</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RecipeView;

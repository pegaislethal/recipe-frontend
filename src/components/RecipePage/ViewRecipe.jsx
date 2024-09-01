import React, { useEffect, useState } from 'react';
import Header from "../Header";
import Footer from "../Footer";
import SearchBar from "../RecipePage/SearchBar";
import Card from "../RecipePage/Card";
import { Axios } from '../../../services/AxiosInstance';

const ViewRecipe = () => {
  const [recipeData, setRecipeData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  useEffect(() => {
    // Function to fetch recipe data
    const fetchRecipes = async () => {
      try {
        const response = await Axios.get('/recipes'); 
        setRecipeData(response.data); // Assuming the response data is an array of recipes
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchRecipes(); 
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Header />
      <SearchBar />
      <div className="grid grid-cols-3 px-[120px] py-[50px] gap-4">
        {
          recipeData.map((recipe) => (
            <Card key={recipe._id} recipe={recipe} /> // Pass recipe data to the Card component
          ))
         }
      </div>
      <Footer />
    </>
  );
};

export default ViewRecipe;

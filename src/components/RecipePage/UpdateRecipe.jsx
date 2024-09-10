import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import Header from "../Header";
import Footer from "../Footer";
import { Axios } from "../../../services/AxiosInstance";

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {
    fields: ingredients,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: directions,
    append: addDirection,
    remove: removeDirection,
  } = useFieldArray({ control, name: "directions" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await Axios.get(`/recipes/${id}`);
        const recipeData = response.data;

        reset({
          recipeTitle: recipeData.recipeTitle,
          recipeDesc: recipeData.recipeDesc,
          preparationTime: recipeData.preparationTime,
          calorie: recipeData.calorie,
          chef: recipeData.chef,
          category: recipeData.category,
          ingredients: recipeData.ingredients || [],
          directions: recipeData.directions || [],
        });
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setError("Failed to fetch recipe data.");
      }
    };

    fetchRecipe();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Submitting data as JSON object
      const response = await Axios.patch(`/recipes/${id}`, {
        recipeTitle: data.recipeTitle,
        recipeDesc: data.recipeDesc,
        preparationTime: data.preparationTime,
        calorie: data.Calorie,
        chef: data.Chef,
        category: data.category,
        ingredients: data.ingredients.map((ingredient) => ingredient.value),
        directions: data.directions.map((direction) => direction.value),
      });

      setSuccess("Recipe updated successfully!");
      console.log("Response:", response.data);
      reset(); // Reset the form after successful submission
      navigate(`/recipes/${id}`); // Redirect to the recipe view page after update
    } catch (error) {
      console.error("There was an error updating the recipe!", error);
      setError("There was an error updating the recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="max-w-lg mx-auto p-4 flex-grow">
        <h2 className="text-2xl font-bold mb-4">Update Recipe</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Recipe Title */}
          <div className="mb-4">
            <label className="block text-gray-700">Recipe Title</label>
            <input
              {...register("recipeTitle", { required: "Recipe Title is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.recipeTitle && <p className="text-red-500">{errors.recipeTitle.message}</p>}
          </div>

          {/* Recipe Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Recipe Description</label>
            <textarea
              {...register("recipeDesc", { required: "Recipe Description is required" })}
              className="w-[400px] p-2 border border-gray-300 rounded mt-1"
            />
            {errors.recipeDesc && <p className="text-red-500">{errors.recipeDesc.message}</p>}
          </div>

          {/* Preparation Time */}
          <div className="mb-4">
            <label className="block text-gray-700">Preparation Time (minutes)</label>
            <input
              type="number"
              {...register("preparationTime", { required: "Preparation Time is required", min: 1 })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.preparationTime && <p className="text-red-500">{errors.preparationTime.message}</p>}
          </div>

          {/* Calorie */}
          <div className="mb-4">
            <label className="block text-gray-700">Calorie (kcal)</label>
            <input
              type="number"
              {...register("calorie", { required: "Calorie is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.calorie && <p className="text-red-500">{errors.calorie.message}</p>}
          </div>

          {/* Chef */}
          <div className="mb-4">
            <label className="block text-gray-700">Chef</label>
            <input
              {...register("chef", { required: "Chef name is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.chef && <p className="text-red-500">{errors.chef.message}</p>}
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label className="block text-gray-700">Ingredients</label>
            {ingredients.map((item, index) => (
              <div key={item.id} className="flex items-center mb-2">
                <input
                  {...register(`ingredients.${index}.value`, { required: "Ingredient is required" })}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addIngredient({ value: "" })}
              className="bg-gray-200 text-gray-700 p-2 rounded"
            >
              Add Ingredient
            </button>
          </div>

          {/* Directions */}
          <div className="mb-4">
            <label className="block text-gray-700">Directions</label>
            {directions.map((item, index) => (
              <div key={item.id} className="flex items-center mb-2">
                <textarea
                  {...register(`directions.${index}.value`, { required: "Direction is required" })}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                <button
                  type="button"
                  onClick={() => removeDirection(index)}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDirection({ value: "" })}
              className="bg-gray-200 text-gray-700 p-2 rounded"
            >
              Add Direction
            </button>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>

          {/* Loading State */}
          {loading && <p>Loading...</p>}
          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}
          {/* Success Message */}
          {success && <p className="text-green-500">{success}</p>}

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
            Update Recipe
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateRecipe;

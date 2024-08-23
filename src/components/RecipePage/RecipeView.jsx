import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import momo from "../../assets/momoimage.jpg";

const RecipeView = () => {
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
            <h1 className="text-4xl font-bold text-red-600 mb-2">Mo-mo</h1>
            <p className="text-yellow-500 text-lg font-semibold mb-4">
              ★★★★★ Rating
            </p>
          </div>
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md text-gray-800">
            <p className="text-lg mb-2">
              <strong>Time:</strong> 20 min
            </p>
            <p className="text-lg mb-2">
              <strong>Level:</strong> Intermediate
            </p>
            <p className="text-lg mb-2">
              <strong>Servings:</strong> 10 pieces
            </p>
            <p className="text-lg">
              <strong>Nutritious per plate:</strong> 209 calories
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
              <li>2 cups flour</li>
              <li>2 teaspoon baking powder</li>
              <li>1 tablespoon sugar</li>
              <li>2 eggs</li>
              <li>2 cups milk</li>
              <li>3 tablespoons melted butter</li>
              <li>Salt</li>
            </ul>
          </div>
          <div className="flex-1 md:ml-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Directions</h2>
            <ol className="list-decimal list-inside text-gray-700 text-lg leading-relaxed">
              <li>In a large bowl, mix all the dry ingredients.</li>
              <li>Add the eggs and milk, and mix until smooth.</li>
              <li>Pour the batter into a preheated, greased pan.</li>
              <li>Cook over medium heat until bubbles form on the surface.</li>
              <li>Flip and cook the other side until golden brown.</li>
              <li>Serve with your favorite toppings.</li>
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

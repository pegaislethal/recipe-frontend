import React from 'react';
import food from '../../assets/food.jpg';
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Card = ({recipe}) => {
  console.log(recipe)
  return (
    <div className="border border-gray-800 rounded-lg shadow-lg inline-block text-sm h-fit p-3 w-[250px] flex-grow">
      <img className='w-full h-[180px] object-cover rounded-t-lg' src={recipe.Image} alt="Delicious momo" />
      <h1 className='text-lime-600 mt-2'>{recipe.recipeTitle}</h1>
      <div className='flex justify-between mt-1'>
        <p className='text-xs'>{recipe.recipeDesc}</p>
        <Link to={`/viewRecipe/${recipe._id}`} className='text-[12px] flex justify-between items-center bg-green-600 px-2 py-1 rounded-lg text-white hover:bg-green-700 transition duration-300'>
          View Recipe <FaArrowCircleRight className='ml-1 text-[18px]' />
        </Link>    
      </div>
    </div>
  );
}

export default Card;

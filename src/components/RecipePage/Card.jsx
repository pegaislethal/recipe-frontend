import React from 'react'
import food from  '../../assets/food.jpg'
import { FaArrowCircleRight } from "react-icons/fa";

const Card = () => {
  return (
    <div className="border border-gray-800 rounded-lg shadow-lg inline-block text-sm h-64 p-5 m-4 ml-12 w-[220px]">
        <img className='foodImage' src={food} alt="momo image" ></img>
        <h1 className='text-lime-600'>Mo-mo:</h1>
        <div className='flex justify-between'>
          <p className='text-xs '>Mitho mitho momo</p>
          <p className='text'>View Recipes <FaArrowCircleRight /></p>    
        </div>
   
    </div>
  )
}

export default Card
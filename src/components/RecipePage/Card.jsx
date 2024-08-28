import React from 'react'
import food from  '../../assets/food.jpg'
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Card = () => {
  return (
    <div className="border border-gray-800 rounded-lg shadow-lg inline-block text-sm h-64 p-3 w-[220px] flex-grow">
        <img className='foodImage' src={food} alt="momo image" ></img>
        <h1 className='text-lime-600'>Mo-mo:</h1>
        <div className='flex justify-between'>
          <p className='text-xs '>Mitho mitho momo</p>
          <Link to={'/'} className='text-[12px] flex justify-between items-center bg-green-600 px-2 py-1 rounded-lg'>View Recipes <FaArrowCircleRight className='text-[18px]' /></Link>    
        </div>
   
    </div>
  )
}

export default Card
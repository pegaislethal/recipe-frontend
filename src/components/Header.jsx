import React from 'react';
import { FaBars } from "react-icons/fa"; 
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className='bg-[#F18455] flex justify-center align-text-bottom'>
      <ul className='flex items-center space-x-20  h-10'>
        <li><NavLink to={''}>Home</NavLink></li>
        <li><NavLink to={'/recipes'}>Recipes</NavLink></li>
        <li><a href='#'>About Us</a></li>
        <li><a href='#'>Contact Us</a></li>
        <li><NavLink to={'/user/profile'}><FaBars /></NavLink></li>
      </ul>
    </div>
  );
}

export default Header;

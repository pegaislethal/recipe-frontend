import React from 'react';
import { FaBars } from "react-icons/fa"; 

const Header = () => {
  return (
    <div className='bg-[#F18455] flex justify-center align-text-bottom'>
      <ul className='flex items-center space-x-20  h-10'>
        <li><a href='#'>Home</a></li>
        <li><a href='#'>About Us</a></li>
        <li><a href='#'>Contact Us</a></li>
        <li><a href='#'><FaBars /></a></li>
      </ul>
    </div>
  );
}

export default Header;

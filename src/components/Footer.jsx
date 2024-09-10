import React from 'react';


  const Footer = () => {
    return (
      <div className="bg-[#F18455] w-full flex justify-center items-center py-2  bottom-0 ">
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} RecipeApp. All rights reserved.
        </p>
      </div>
    );
  };
export default Footer;

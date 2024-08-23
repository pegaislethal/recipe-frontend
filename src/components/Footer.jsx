import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#F18455] w-full flex justify-center items-center py-2 fixed bottom-0 left-0">
      <p className="text-white text-sm">
        Copyright &copy; {new Date().getFullYear()} Infringement Acts
      </p>
    </div>
  );
};

export default Footer;

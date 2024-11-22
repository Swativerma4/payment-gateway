import React from 'react';
import logo from "../assets/logo2.png";

const handleLogin = () => {
  navigate("/");  
};
const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg w-full px-8 sm:px-16 py-4 flex justify-between items-center">
      {/* Logo */}
      <img src={logo} alt="Logo" className="h-16 w-auto" />
      
      {/* Title: Positioned next to the logo on large screens, hidden on mobile */}
      <h2 className="text-blue-950 text-lg font-semibold  hidden sm:block ml-4">
        Uway Software Solutions
      </h2>

      {/* Login text with link */}
      <p className="text-gray-600 text-sm sm:text-base">
        Have an account?{' '}
        <a  onClick={handleLogin} className="text-red-600 hover:underline">
          Login
        </a>
      </p>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import logo from "../assets/logo2.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg w-full px-8 sm:px-16 py-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-16 w-auto" />
      <h2 className="text-blue-950 ml-[-41rem]">Uway Software Solutions</h2>
      <p className="text-gray-600">
        Have an account?{' '}
        <a href="/login" className="text-red-600 hover:underline">
          Login
        </a>
      </p>
    </nav>
  );
};

export default Navbar;


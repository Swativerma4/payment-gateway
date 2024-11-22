import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from "../assets/Animation2";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Make sure you have react-router-dom installed for navigation


function App() {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Email || !password) {
      setError('All fields are required. Please fill in both Email and Password.');
      return;
    }

    // Clear any previous error
    setError('');

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:8082/login', {
        email: Email, // Correct field name used here
        password: password,
      });

      if (response.data.success) {
        navigate("/dashboard");
        localStorage.setItem("user", true);
      } else {
        setError(response.data.message); // Show the error message from the backend
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Something went wrong, please try again.');
    }
  };

  const handleRegister = () => {
    navigate("/Register");  
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-blue-950 p-10 lg:p-24 flex flex-col justify-center items-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-white text-center">
          Enable <span className="text-red-600">Businesses</span> to Digitalization.
        </h1>
        <div className="mt-8 lg:mt-14">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-gray-50 p-8 lg:p-11 flex flex-col justify-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-blue-950 text-center lg:text-left">
          Welcome to <br />
          <span className="text-red-600">Uway Software Solutions</span>
        </h2>
        <form className="mt-10 lg:mt-20 space-y-6" onSubmit={handleSubmit}>
          {/* Display Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-md text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-600 text-left pb-2">Email</label>
            <input
              type="text"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 text-left pb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.06.206-.148.397-.26.574L16.35 6.35M9.65 17.65L6.35 20.35c-.278.112-.568.2-.874.26C4.268 19.943 3.477 15 2.458 12z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19a10 10 0 110-20 9.97 9.97 0 011.875.175m-1.867 4.99a4 4 0 11-4.858 4.858m4.858-4.858L12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-red-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600 text-center lg:text-left">
          Don’t have an account?{' '}
          <a onClick={handleRegister} href="Register" className="text-red-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;

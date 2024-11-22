// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import Amimation from "../assets/Animation5.json"
const Dashboard = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating a payment success (You can replace this with a real payment check)
    const paymentSuccess = localStorage.getItem('paymentStatus');
    if (paymentSuccess === 'true') {
      setIsRegistered(true);
    } 
  }, [navigate]);

  return (
    <div className= "flex flex-col items-center justify-center bg-white py-6">


    
        <div className="bg-green-100 text-center p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">Congratulations!</h2>
          <p className="text-lg text-gray-700 mb-4">You are now registered. You can start converting your business into digitalization.</p>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
          >
            Explore Services
          </button>
        </div>
        <div className="mt-8 lg:mt-14">
          <Lottie
            animationData={Amimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
      
    </div>
  );
};

export default Dashboard;

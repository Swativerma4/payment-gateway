import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Animation3";
import { 
  FaUser, 
  FaEnvelope, 
  FaCreditCard, 
  FaCalendarAlt, 
  FaLock, 
  FaDollarSign, 
  FaMobileAlt 
} from "react-icons/fa";
import axios from 'axios';

function App() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    upiId: "",
    bank: "",
    amount: "1000", // Fixed amount
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // For demonstration, you can replace this with your actual login or register API call
    try {
      const response = await axios.post('http://localhost:5000/api/message', formData);
      alert(`Payment Successful via ${paymentMethod.toUpperCase()}!`);
      console.log(response.data);
    } catch (error) {
      console.error("Error during API call:", error);
      alert("There was an error processing the payment");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-blue-950 p-10 lg:p-36 flex flex-col justify-center items-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-white text-center">
          Enable <span className="text-red-600">Businesses</span> to Digitalization.
        </h1>
        <div className="mt-8 lg:mt-14">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "100%", maxWidth: "500px", height: "auto" }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-gray-50 p-8 lg:p-11 flex flex-col justify-center" style={{ minHeight: "650px" }}>
        <h2 className="text-2xl lg:text-3xl font-bold text-blue-950 text-center lg:text-left">
          Payment Information
        </h2>

        {/* Payment Method Selector */}
        <div className="mt-8 space-y-6">
          <label className="block font-medium text-gray-700">Select Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>

        {/* Payment Form */}
        <form className="mt-8 space-y-6" onSubmit={handlePaymentSubmit}>
          {/* Name Field */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handlePaymentChange}
              placeholder="Your Name"
              className="w-full outline-none"
              required
            />
          </div>

          {paymentMethod === "card" && (
            <>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaCreditCard className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="Card Number (1234 5678 9012 3456)"
                  className="w-full outline-none"
                  maxLength={16}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    className="w-full outline-none"
                    required
                  />
                </div>
                <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handlePaymentChange}
                    placeholder="CVV"
                    className="w-full outline-none"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "upi" && (
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaMobileAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handlePaymentChange}
                placeholder="UPI ID (e.g., name@bank)"
                className="w-full outline-none"
                required
              />
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaBank className="text-gray-500 mr-2" />
              <input
                type="text"
                name="bank"
                value={formData.bank}
                onChange={handlePaymentChange}
                placeholder="Bank Name"
                className="w-full outline-none"
                required
              />
            </div>
          )}

          {/* Amount Field (Fixed) */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaDollarSign className="text-gray-500 mr-2" />
            <input
              type="text"
              name="amount"
              value={formData.amount}
              disabled
              className="w-full outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

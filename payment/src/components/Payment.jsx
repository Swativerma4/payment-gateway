import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Animation3";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaCreditCard, 
  FaCalendarAlt, 
  FaLock, 
  FaDollarSign, 
  FaMobileAlt 
} from "react-icons/fa";

function App() {
  const navigate = useNavigate(); 
  //React's state management using the useState hook.
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    upiId: "",
    bank: "",
    amount: "1000", 
  });
//change event handler function.

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    // shallow copy
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Successful via ${paymentMethod.toUpperCase()}!`);
     navigate("/Dashboard");
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
            style={{ width: "100%", maxWidth: "500px", height: "auto" }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-gray-50 p-8 lg:p-11 flex flex-col justify-center">
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
              <FaLock className="text-gray-500 mr-2" />
              <select
                name="bank"
                value={formData.bank}
                onChange={handlePaymentChange}
                className="w-full outline-none"
                required
              >
                <option value="">Select Your Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
              </select>
            </div>
          )}

          {/* Fixed Amount */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaDollarSign className="text-gray-500 mr-2" />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              readOnly
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

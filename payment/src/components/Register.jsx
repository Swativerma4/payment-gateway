import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const pincodeURL = "https://api.postalpincode.in/pincode/";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    fathersName: '',
    city: '',
    qualification: '',
    pinCode: '',
    email: '',
    password: '',
    role: 'User',
  });

  const [cityFromPincode, setCityFromPincode] = useState('');
  const [alertQueue, setAlertQueue] = useState([]); 

  // Fetch city from pincode
  const fetchCityFromPincode = async (pincode) => {
    try {
      const response = await fetch(`${pincodeURL}${pincode}`);
      const data = await response.json();
      if (data[0].Status === 'Success') {
        const city = data[0].PostOffice[0].Division;
        setCityFromPincode(city);
      } else {
        setCityFromPincode('');
      }
    } catch (error) {
      console.error("Error fetching city from pincode", error);
      setCityFromPincode('');
    }
  };

  useEffect(() => {
    if (formData.pinCode.length === 6) {
      fetchCityFromPincode(formData.pinCode);
    }
  }, [formData.pinCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Mobile number logic to allow only numeric values
    if (name === 'mobileNumber' && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }

    // Prevent entering more than 6 digits for pinCode
    if (name === 'pinCode' && value.length > 6) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = () => {
    const {
      firstName,
      lastName,
      mobileNumber,
      fathersName,
      city,
      email,
      password,
      role,
      pinCode,
    } = formData;

    const isCityValid = city === cityFromPincode;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return (
      firstName &&
      lastName &&
      mobileNumber.length === 10 &&
      fathersName &&
      city &&
      email &&
      passwordRegex.test(password) &&
      role &&
      pinCode.length === 6 &&
      isCityValid
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
  
    let errors = [];
  
    // Check for missing fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobileNumber ||
      !formData.fathersName ||
      !formData.city ||
      !formData.pinCode ||
      !formData.email ||
      !formData.password
    ) {
      errors.push("Please fill in all required fields.");
    } else {
      // Specific field checks
      if (formData.mobileNumber.length !== 10) {
        errors.push("Mobile Number must be 10 digits.");
      }
  
      if (formData.pinCode.length !== 6) {
        errors.push("Pincode must be 6 digits.");
      }
  
      // City mismatch with pincode
      if (formData.city !== cityFromPincode) {
        errors.push('The city does not match the pincode.');
      }
  
      // Password validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        errors.push('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
      }
    }
  
    // If errors, set the alert queue
    if (errors.length > 0) {
      setAlertQueue(errors);
    } else {
      // Proceed with registration and navigate to payment page
      navigate('/Payment');
    }
  };

  useEffect(() => {
    if (alertQueue.length > 0) {
      alert(alertQueue[0]);
      setAlertQueue((prevQueue) => prevQueue.slice(1)); // Remove the first alert
    }
  }, [alertQueue]);

  return (
    <div className="w-full">
      <div className="min-h-screen bg-gray-100 flex flex-col pb-20">
        <div className="flex flex-col items-center justify-center mt-12 px-6 lg:px-16">
          <div className="w-full max-w-4xl bg-white p-6 text-left py-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 text-center">Register Here</h2>
            <form className="mt-6 space-y-4" onSubmit={handleRegister}>
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 py-3">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="py-3 block text-sm font-medium text-gray-700">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your last name"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="py-3 block text-sm font-medium text-gray-700">Mobile Number *</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your mobile number"
                />
              </div>

              {/* Father's Name */}
              <div>
                <label className="py-3 block text-sm font-medium text-gray-700">Father's Name *</label>
                <input
                  type="text"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your father's name"
                />
              </div>

              {/* City */}
              <div>
                <label className="py-3 block text-sm font-medium text-gray-700">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your city"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="py-3 block text-sm font-medium text-gray-700">Pincode *</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  maxLength={6}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your pincode"
                />
              </div>

              {/* Email */}
              <div>
                <label className="py-3 block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="py-3 block text-sm font-medium text-gray-700">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700"
                 
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;


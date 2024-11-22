import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const pincodeURL = "https://api.postalpincode.in/pincode/";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    Phone: '', // Changed from mobileNumber
    fatherName: '', // Changed from fathersName
    City: '', // Changed from city
    Qualification: '', // Added to match backend
    PinCode: '', // Changed from pinCode
    Email: '', // Changed from email
    Password: '', // Changed from password
    Role: 'User',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formData.PinCode.length === 6) {
      fetchCityFromPincode(formData.PinCode);
    }
  }, [formData.PinCode]);

  const isFormValid = () => {
    const {
      firstName,
      lastName,
      Phone,
      fatherName,
      City,
      Email,
      Password,
      Role,
      PinCode,
    } = formData;

    const isCityValid = City === cityFromPincode;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return (
      firstName &&
      lastName &&
      Phone.length === 10 &&
      fatherName &&
      City &&
      Email &&
      passwordRegex.test(Password) &&
      Role &&
      PinCode.length === 6 &&
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
      !formData.Phone ||
      !formData.fatherName ||
      !formData.City ||
      !formData.PinCode ||
      !formData.Email ||
      !formData.Password
    ) {
      errors.push("Please fill in all required fields.");
    } else {
      // Specific field checks
      if (formData.Phone.length !== 10) {
        errors.push("Mobile Number must be 10 digits.");
      }

      if (formData.PinCode.length !== 6) {
        errors.push("Pincode must be 6 digits.");
      }

      // City mismatch with pincode
      if (formData.City !== cityFromPincode) {
        errors.push('The city does not match the pincode.');
      }

      // Password validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.Password)) {
        errors.push('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
      }
    }

    // If errors, set the alert queue
    if (errors.length > 0) {
      setAlertQueue(errors);
    } else {
      localStorage.setItem("registrationData", JSON.stringify(formData));
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
                  name="Phone"
                  value={formData.Phone}
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
                  name="fatherName"
                  value={formData.fatherName}
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
                  name="City"
                  value={formData.City}
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
                  name="PinCode"
                  value={formData.PinCode}
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
                  name="Email"
                  value={formData.Email}
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
                  name="Password"
                  value={formData.Password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  placeholder="Enter your password"
                />
              </div>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-950 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  disabled={!isFormValid()}
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

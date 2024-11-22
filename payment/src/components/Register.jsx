import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const pincodeURL = "https://api.postalpincode.in/pincode/";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    Phone: "",
    fatherName: "",
    City: "",
    Qualification: "", // Optional field
    Pincode: "",
    Email: "",
    Password: "",
    Role: "User",
  });

  const [cityFromPincode, setCityFromPincode] = useState("");
  const [alertQueue, setAlertQueue] = useState([]);
  const [errors, setErrors] = useState({});

  // Debugging - Log formData and cityFromPincode on every render
  useEffect(() => {
    console.log("Form Data Updated:", formData);
    console.log("City from Pincode API:", cityFromPincode);
  }, [formData, cityFromPincode]);

  // Fetch city from pincode
  const fetchCityFromPincode = async (pincode) => {
    try {
      const response = await fetch(`${pincodeURL}${pincode}`);
      const data = await response.json();
      console.log("API Response:", data); // Log API response

      if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice[0]) {
        const city = data[0].PostOffice[0].Division;
        setCityFromPincode(city);
      } else {
        setCityFromPincode("");
        alert("Unable to fetch city. Please check the pincode.");
      }
    } catch (error) {
      console.error("Error fetching city from pincode:", error);
      setCityFromPincode("");
      alert("There was an error fetching the city. Please try again later.");
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
    if (formData.Pincode.length === 6) {
      fetchCityFromPincode(formData.Pincode);
    }
  }, [formData.Pincode]);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      Pincode,
    } = formData;

    const normalizedCityFromAPI = cityFromPincode.trim().toLowerCase();
    const normalizedCityFromForm = City.trim().toLowerCase();

    const isCityValid = normalizedCityFromForm === normalizedCityFromAPI;

    const passwordValid = passwordRegex.test(Password);

    setErrors({
      firstName: !firstName,
      lastName: !lastName,
      Phone: Phone.length !== 10,
      fatherName: !fatherName,
      City: !City || normalizedCityFromForm !== normalizedCityFromAPI,
      Email: !Email,
      Password: !passwordValid,
      Role: !Role,
      Pincode: Pincode.length !== 6,
      passwordValid: !passwordValid,
    });

    return (
      firstName &&
      lastName &&
      Phone.length === 10 &&
      fatherName &&
      City &&
      Email &&
      passwordValid &&
      Role &&
      Pincode.length === 6 &&
      isCityValid
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let errors = [];

    if (!isFormValid()) {
      errors.push("Please correct the highlighted errors before proceeding.");
    }

    // Check if City matches with Pincode API result
    const normalizedCityFromAPI = cityFromPincode.trim().toLowerCase();
    const normalizedCityFromForm = formData.City.trim().toLowerCase();
    if (normalizedCityFromForm !== normalizedCityFromAPI) {
      errors.push(`The city does not match the Pincode. The correct city is ${cityFromPincode}.`);
    }

    if (errors.length > 0) {
      setAlertQueue(errors);
    } else {
      console.log("Registration Data:", formData); // Log form data
      localStorage.setItem("registrationData", JSON.stringify(formData));
      navigate("/Payment");
    }
  };

  useEffect(() => {
    if (alertQueue.length > 0) {
      alert(alertQueue[0]);
      setAlertQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [alertQueue]);

  return (
    <div className="w-full">
      <div className="min-h-screen bg-gray-100 flex flex-col pb-20">
        <div className="flex flex-col items-center justify-center mt-12 px-6 lg:px-16">
          <div className="w-full max-w-4xl bg-white p-6 text-left py-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 text-center">Register Here</h2>
            <form className="mt-6 space-y-4" onSubmit={handleRegister}>
              {/* Input Fields */}
              {[
                { label: "First Name", name: "firstName", type: "text" },
                { label: "Last Name", name: "lastName", type: "text" },
                { label: "Mobile Number", name: "Phone", type: "text", maxLength: 10 },
                { label: "Father's Name", name: "fatherName", type: "text" },
                { label: "City", name: "City", type: "text" },
                { label: "Pincode", name: "Pincode", type: "text", maxLength: 6 },
                { label: "Qualification (Optional)", name: "Qualification", type: "text" }, // Optional field
                { label: "Email", name: "Email", type: "email" },
                { label: "Password", name: "Password", type: "password" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="py-3 block text-sm font-medium text-gray-700">
                    {field.label} {field.name === "Qualification" && "(Optional)"}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    maxLength={field.maxLength}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  ${errors[field.name] ? 'border-red-500 ' : 'border-gray-300'} focus:ring-blue-950`}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                  {/* Show specific error for Password */}
                  {field.name === "Password" && errors[field.name] && (
                    <p className="text-red-500 text-sm">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
                  )}
                </div>
              ))}
              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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

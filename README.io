Payment Gateway Project
This project is a React-based payment gateway interface where users can register and make payments. It provides functionalities like user registration, form validation, city verification using a pincode, and handling various payment methods such as credit card, UPI, and net banking. Additionally, it connects to MongoDB for user data storage, and after a successful payment, the user is automatically redirected to their dashboard.
________________________________________
Features
•	User Registration: Collects user details including name, phone number, email, and password.
•	Pincode Validation: Uses an API to fetch the city corresponding to the user's pincode and checks whether the city matches.
•	Form Validation: Validates fields like:
o	Phone number: Must be 10 digits long.
o	Password strength: Verified using regex for strong password requirements.
o	City-pincode matching: Ensures that the pincode corresponds to the entered city.
•	Payment Methods: Supports credit card, UPI, and net banking for payments.
•	MongoDB Integration: User data is stored in a MongoDB database for persistence.
•	Payment Confirmation: After a successful payment, the user is automatically redirected to their dashboard.
•	Responsive Design: The interface is designed to be responsive for both mobile and desktop views.
________________________________________
Tech Stack
•	Frontend: React.js (running on port 5172)
•	Backend: Node.js, Express.js (running on port 8082)
•	Database: MongoDB (using Mongoose for database interaction)
•	Styling: Tailwind CSS
•	Animation: Lottie for animations
•	API: Postal Pincode API for city validation from the pincode
________________________________________
Features Flow
User Registration
1.	Users provide their details, including name, email, phone number, etc.
2.	The system checks for city validation based on the provided pincode.
3.	The registration details are sent to the backend and stored in MongoDB.
________________________________________
Payment
1.	Users can choose their preferred payment method (credit card, UPI, or net banking).
2.	The payment details are validated and sent to the backend.
3.	Upon successful payment, the user is redirected to their dashboard.
________________________________________
Installation and Setup
1.	Clone this repository:
bash
Copy code
git clone https://github.com/your-username/payment-gateway.git
2.	Install dependencies for both frontend and backend:
bash
Copy code
cd frontend
npm install
cd ../backend
npm install
3.	Start the development servers:
                         Frontend:
bash
Copy code
npm run dev -- --port 5172
Backend:
bash
Copy code
npm start --port 8082
4.	Ensure MongoDB is running locally or provide a connection string in the .env file.


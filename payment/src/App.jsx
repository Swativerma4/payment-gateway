import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import LoginPage from './components/Login_page';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';

function App() {
    const [message, setMessage] = useState(''); // State for storing data from the backend

    // Fetch data from the backend on component mount
    useEffect(() => {
        axios.get('http://localhost:5173') // Replace with your backend URL
            .then((response) => {
                setMessage(response.data.message); // Update the state with the backend data
            })
            .catch((error) => {
                console.error('Error fetching data from the backend:', error);
            });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/Register" element={<><Navbar /><Register/></>} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

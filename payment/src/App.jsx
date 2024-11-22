import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import LoginPage from './components/Login_page';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Protectedroute';

function App() {
    const [message, setMessage] = useState(''); // State for storing data from the backend

    // Fetch data from the backend on component mount


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/Register" element={<><Navbar /><Register/></>} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
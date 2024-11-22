const mongoose = require('mongoose');
require('dotenv').config();
 

const connectdb = () => {
    mongoose.connect(process.env.MONGODB_URI, {})
        .then(() => {
            console.log("Connected to database");
        
        })
        .catch((err) => {
            console.log("Database connection error:", err);
        });
};

module.exports = connectdb;
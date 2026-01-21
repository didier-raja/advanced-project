require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./src/config/db');
const Project = require('./src/models/Project'); // MATCHES YOUR FILENAME

const app = express();

// Middleware & View Engine
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'view')); // Matches your 'view' folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple Test Route
app.get('/', (req, res) => {
    res.send('<h1>Server is Live and Table is Synced!</h1>');
});

// Startup Function
const start = async () => {
    try {
        await connectDB();
        
        // This command creates the 'Projects' table in MySQL
        await sequelize.sync({ alter: true }); 
        console.log("✅ Database synced and 'Projects' table ready!");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ App failed to start:", err.message);
    }
};

start();
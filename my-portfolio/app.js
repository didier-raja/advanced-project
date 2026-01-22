require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./src/config/db');

// Import Middleware & Controller
const logger = require('./src/middleware/logger');
const projectController = require('./src/controllers/projectController');

const app = express();

// --- VIEW ENGINE & SETTINGS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// --- MIDDLEWARE ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger); // This will log every request in your terminal

// --- ROUTES ---
// This tells Express: when someone visits '/', use the Controller logic
app.get('/', projectController.getHomePage);

// --- START SERVER ---
const start = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true }); 
        console.log("✅ Database synced successfully.");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 STORE LIVE AT: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Startup Error:", err.message);
    }
};

start();
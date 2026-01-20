require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const logger = require('./middleware/logger');

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(logger);
app.use(express.static('public'));

// Routes
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
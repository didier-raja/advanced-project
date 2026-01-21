require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./src/config/db');
const Project = require('./src/models/Project'); 

const app = express();

// Middleware & View Engine
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

// --- FRONT END ROUTE ---
app.get('/', async (req, res) => {
    try {
        // Fetches all projects from MySQL
        const projects = await Project.findAll(); 
        
        // Renders index.ejs and passes the data as 'products'
        res.render('index', { products: projects }); 
    } catch (err) {
        console.error("❌ Error loading homepage:", err);
        res.status(500).send("Database Error");
    }
});

// --- SERVER STARTUP ---
const start = async () => {
    try {
        await connectDB();
        
        // 1. Sync Database (Creates the table)
        await sequelize.sync({ alter: true }); 
        console.log("✅ Database synced.");

        // 2. ADD SAMPLE DATA (So your front end isn't empty)
        await Project.findOrCreate({
            where: { title: 'Sample Laptop' },
            defaults: {
                price: 999.99,
                description: 'A powerful test laptop',
                imageUrl: 'https://via.placeholder.com/150'
            }
        });
        console.log("✅ Sample data verified.");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ App failed to start:", err.message);
    }
};

start();
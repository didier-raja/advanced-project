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

// ⚠️ ICYITONDERWA: Iyi mirongo ni ngombwa kugira ngo Forms zikore
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger); 

// --- ROUTES (Vuguruwe) ---

// 1. Home Page - Kwerekana ibicuruzwa
app.get('/', projectController.getHomePage);

// 2. Add Product Page - Kwerekana ya fomu yera
app.get('/add-product', projectController.getAddProductPage);

// 3. Save Product - Kubika ibyavuye kuri fomu muri MySQL
app.post('/add-product', projectController.postAddProduct);

// 4. Delete Product - Gusiba igicuruzwa (Delete)
app.post('/delete-product', projectController.postDeleteProduct);


// --- START SERVER ---
const start = async () => {
    try {
        await connectDB();
        
        // sequelize.sync({ alter: true }) ivugurura imbonerahamwe muri MySQL automatically
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
const Project = require('../models/Project');

exports.getHomePage = async (req, res) => {
    try {
        // 1. Get all projects from MySQL
        const items = await Project.findAll(); 
        
        // 2. Render index.ejs and pass the data as 'products'
        res.render('index', { products: items }); 
    } catch (err) {
        console.error("❌ Controller Error:", err);
        res.status(500).send("Database Error - Check Terminal");
    }
};
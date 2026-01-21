const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    // 1. Fetch data from Database
    const items = await Product.findAll(); 
    
    // 2. Send data to the View (HTML)
    res.render('index', { products: items }); 
};
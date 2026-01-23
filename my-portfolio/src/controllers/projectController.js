const Project = require('../models/Project');

/**
 * @desc    Fetches all products and renders the home page
 * @route   GET /
 */
exports.getHomePage = async (req, res) => {
    try {
        const items = await Project.findAll();

        const formattedProducts = items.map(item => {
            const p = item.get({ plain: true });
            return {
                id: p.id,
                title: p.title,
                description: p.description,
                price: p.price,
                imageUrl: (p.imageUrl && p.imageUrl.trim() !== '') 
                    ? p.imageUrl 
                    : 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png'
            };
        });

        console.log(`✅ Fetched ${formattedProducts.length} products.`);
        res.render('index', { products: formattedProducts });

    } catch (err) {
        console.error("❌ Controller Error:", err.message);
        res.status(500).render('index', { products: [], error: "Database error." });
    }
};

/**
 * @desc    Show the Add Product Form
 * @route   GET /add-product
 */
exports.getAddProductPage = (req, res) => {
    res.render('add-product'); // Ifungura ya file nshya ya 'add-product.ejs'
};

/**
 * @desc    Receive form data and save to MySQL
 * @route   POST /add-product
 */
exports.postAddProduct = async (req, res) => {
    try {
        const { title, price, imageUrl, description } = req.body;

        await Project.create({
            title,
            price,
            description,
            imageUrl: imageUrl || 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png'
        });

        console.log("✅ New product saved to database!");
        res.redirect('/'); // Isubira kuri Home Page kureba ibyo wabitse
    } catch (err) {
        console.error("❌ Save Error:", err.message);
        res.status(500).send("Ntibyakunze kubika igicuruzwa.");
    }
};

/**
 * @desc    Remove a product from MySQL
 * @route   POST /delete-product
 */
exports.postDeleteProduct = async (req, res) => {
    try {
        const prodId = req.body.id;
        await Project.destroy({ where: { id: prodId } });
        
        console.log(`🗑️ Product with ID ${prodId} deleted.`);
        res.redirect('/');
    } catch (err) {
        console.error("❌ Delete Error:", err.message);
        res.status(500).send("Ntibyakunze gusiba igicuruzwa.");
    }
};
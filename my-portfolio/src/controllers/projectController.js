const Project = require('../models/Project');

/**
 * @desc    Fetches all products from MySQL and renders the home page
 * @route   GET /
 */
exports.getHomePage = async (req, res) => {
    try {
        // 1. Fetch all rows from the 'Projects' table
        const items = await Project.findAll();

        // 2. Clean the data to ensure icons/images show up
        const formattedProducts = items.map(item => {
            const p = item.get({ plain: true });

            return {
                id: p.id,
                title: p.title,
                description: p.description,
                price: p.price,
                // Check if imageUrl exists; if not, use a default tech icon
                imageUrl: (p.imageUrl && p.imageUrl.trim() !== '') 
                    ? p.imageUrl 
                    : 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png'
            };
        });

        // 3. Log to terminal to confirm data was found
        console.log(`✅ Fetched ${formattedProducts.length} products from database.`);

        // 4. Send data to index.ejs
        res.render('index', { 
            products: formattedProducts 
        });

    } catch (err) {
        // This will show up in your terminal if there is a SQL error
        console.error("❌ Controller Error:", err.message);
        
        res.status(500).render('index', { 
            products: [], 
            error: "Could not load products from database." 
        });
    }
};
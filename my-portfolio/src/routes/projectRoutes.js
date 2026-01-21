app.get('/', async (req, res) => {
    try {
        // 1. Fetch all data from your 'Project' table
        const projectData = await Project.findAll(); 
        
        // 2. Render 'index.ejs' and pass the data as a variable named 'products'
        res.render('index', { products: projectData }); 
    } catch (err) {
        console.error("❌ Error fetching projects:", err);
        res.status(500).send("Internal Server Error");
    }
});
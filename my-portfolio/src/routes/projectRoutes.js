// Muri app.js
const projectController = require('./src/controllers/projectController');

app.get('/', projectController.getHomePage); 
app.get('/add-product', projectController.getAddProductPage);
app.post('/add-product', projectController.postAddProduct);
app.post('/delete-product', projectController.postDeleteProduct);
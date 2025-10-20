// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const dotenv = require("dotenv");
dotenv.config();

const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const { validateProduct } = require('./middleware/validation');
const errorHandler = require('./middleware/errorHandler');
const { NotFoundError } = require('./utils/errors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling
// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(logger);
app.use('/api/products',auth);
app.use(errorHandler);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get products with optional filtering and pagination
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;

  let filtered = products;

  // 🔹 Filter by category if specified
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // 🔹 Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginated = filtered.slice(startIndex, endIndex);

  res.json({
    total: filtered.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated
  });
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res)=> {
  const id = req.params.id;
  const product = products.find(p => p.id === id);

  if(!product) {
    return next(new NotFoundError('Product not found'));
  } else {
    res.json(product);
  };
});

// POST /api/products - Create a new product
app.post('/api/products', validateProduct, (req, res)=> {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    name, description, price, category, inStock,
    id: uuidv4()
  };
  products.push(newProduct);
  res.status(201).json({ message: 'Product Added', product: newProduct });
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', validateProduct, (req, res)=> {
  const id = req.params.id;
  const { name, description, price, category, inStock } = req.body;
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = {
    id,
    name,
    description,
    price,
    category,
    inStock
  };

  products[productIndex] = updatedProduct;
  res.json({ message: 'Product updated', product: updatedProduct });
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted' });
});

// GET /api/products/search - Search products by name
app.get('/api/products/search', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Please provide a name to search.' });
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ message: 'No products found matching that name.' });
  }

  res.json({ count: results.length, results });
});

// GET /api/products/stats - Get product statistics
app.get('/api/products/stats', (req, res) => {
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json({ totalProducts: products.length, countByCategory: stats });
});

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 
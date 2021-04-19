const express = require('express');
const app = express();
const recipeRoutes = require('./routes/recipes');

// Parsing incoming json to an object so we can access it in our request handlers
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  next();
});

app.use('/api/recipes', recipeRoutes);

module.exports = app;

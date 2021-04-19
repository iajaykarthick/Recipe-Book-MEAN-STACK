const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    trim: true
  },
  style: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: {
    type: [{
      ingredientName: String,
      quantity: String
    }],
    required: true
  },
  servings: Number,
  cookingTime: String,
  calories: String
})

module.exports = mongoose.model('Recipe', recipeSchema);

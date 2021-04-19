const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

router.post('', (req, res, next) => {

  const recipe = new Recipe({
      recipeName: req.body.recipeName,
      style: req.body.style,
      ingredients: req.body.ingredients,
      servings: req.body.servings,
      cookingTime: req.body.cookingTime,
      calories: req.body.calories
  });

  console.log(recipe);
  recipe.save().then(createdRecipe => {
    res.status(201).json({
      message: "Post added successfully",
      post : {
        ...createdRecipe,
        id: createdRecipe._id,
      }
    });
  });
});


router.get('', (req, res, next) => {

  const recipesGetQuery = Recipe.find();
  recipesGetQuery.then(fetchedRecipes => {
    res.status(200).json({
      post : {
        recipes: fetchedRecipes
      }
    });
  });
});


module.exports = router;

const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const multer = require('multer');
const storage = require('../middleware/storage')


router.post('', multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const recipe = new Recipe({
      recipeName: req.body.recipeName,
      style: req.body.style,
      ingredients: JSON.parse(req.body.ingredients),
      servings: req.body.servings,
      cookingTime: req.body.cookingTime,
      calories: req.body.calories,
      imagePath: url + '/images/' + req.file.filename
  });

  console.log(recipe);
  recipe.save().then(createdRecipe => {
    res.status(201).json({
      message: "Post added successfully"
    });
  });
});


router.get('',  (req, res, next) => {

  const recipesGetQuery = Recipe.find();
  recipesGetQuery.then(fetchedRecipes => {
    res.status(200).json({
        recipes: fetchedRecipes
    });
  });
});


router.delete("/:id", (req, res, next) => {

  Recipe.deleteOne( { _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: 'Recipe deleted!'
      });
  });
});

module.exports = router;

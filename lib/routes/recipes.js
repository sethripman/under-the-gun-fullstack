const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Event = require('../models/Event');

router.use(express.json());

router.post('/api/v1/recipes', (req, res) => {
  Recipe
    .create(req.body)
    .then(recipe => res.send(recipe));
});

router.get('/api/v1/recipes', (req, res) => {
  let recipeQuery = {};
  if(req.query.ingredient) {
    recipeQuery = { 'ingredient.name': req.query.ingredient };
  }
  Recipe
    .find(recipeQuery)
    .select({ name: true })
    .then(recipes => res.send(recipes));
});

router.get('/api/v1/recipes/:id', (req, res) => {
  
  Recipe
    .findById(req.params.id)
    .populate('events')
    .then(recipes => res.send(recipes));
});

router.patch('/api/v1/recipes/:id', (req, res) => {
  Recipe
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(recipe => res.send(recipe));
});

router.delete('/api/v1/recipes/:id', (req, res) => {
  Promise.all([
    Recipe.findByIdAndDelete(req.params.id), Event.deleteMany({ recipe: req.params.id })])
    .then(([recipe]) => res.send(recipe));
});
module.exports = router;

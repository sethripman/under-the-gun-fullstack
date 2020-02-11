import React from 'react';

import './App.css';
import Nav from './nav/Nav';
import RecipeList from './recipes/RecipeList';
import RecipeDetail from './recipes/RecipeDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <Route path='/' component={Nav} />
        <Route exact path='/' component={RecipeList} />
        <Route path='/recipeDetail/:recipe_id' component={RecipeDetail} />
      </Router>
    </>
  );
}

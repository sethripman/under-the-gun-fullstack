import React from 'react';

import './App.css';
import Nav from './nav/Nav';
import RecipeList from './recipes/RecipeList';
import RecipeDetail from './recipes/RecipeDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RecipeForm from '../components/recipeForm/RecipeForm';

export default function App() {
  return (
    <>
      <Router>
        <Nav />
        <Route exact path='/' component={RecipeList} />
        <Route path='/recipeDetail/:recipe_id' component={RecipeDetail} />
        <Route path='/recipeForm' component={RecipeForm} />
      </Router>
    </>
  );
}

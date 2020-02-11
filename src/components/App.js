import React from 'react';
import Nav from './nav/Nav';

import RecipeList from './recipes/RecipeList';
// import RecipeDetail from './recipes/RecipeDetail';
// import { Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Nav />
      <RecipeList />
      {/* <RecipeDetail /> */}
    </>
  );
}

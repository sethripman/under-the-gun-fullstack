import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const RecipeForm = () => {
  const history = useHistory();
  const [recipeName, setRecipeName] = useState('');
  const [directions, setDirections] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const ingredientInputs = ingredients.map(({ name, amount, measurement }, i) => {
    const handleChange = (key) => ({ target }) => setIngredients(oldIngredients => oldIngredients.map((oi, oiIndex) => {
      if(oiIndex === i) return { ...oi, [key]: target.value };
      return oi;
    }));
    return (
      <div key={i} >
        <input type="text" value={name} onChange={handleChange('name')} placeholder="Ingredient Name"/>
        <input type="number" min='0' value={amount} onChange={handleChange('amount')} placeholder="Amount" />
        <select defaultValue={measurement} onChange={handleChange('measurement')}>
          <option value="cup">Cup</option>
          <option value="tablespoon">Tablespoon</option>
          <option value="teaspoon">Teaspoon</option>
          <option value="ounce">Ounce</option>
          <option value="grams">Grams</option>
        </select>

      </div>
    );
  });

  const handleSubmit = event => {
    event.preventDefault();
    return fetch('https://fathomless-meadow-03057.herokuapp.com/api/v1/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: true
      },
      body: JSON.stringify({
        name: recipeName,
        ingredients: ingredients,
        directions: directions 
      })
    })
      .then(res => Promise.all([res.ok, res.json()]))
      .then(([ok, json]) => {
        if(!ok) throw json;
        return json;
      })
      .then(() => {
        history.replace('/');
      });
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text"  value={recipeName} onChange={({ target }) => setRecipeName(target.value)} placeholder="Recipe Name"/>
      </label>
      <label>
        <textarea type="text" value={directions} onChange={({ target }) => setDirections(target.value)} placeholder="Directions"/>
      </label>
      <button type="button" onClick={() => setIngredients(oi => [...oi, { name: '', amount: 0, measurement: 'grams' }])}>Add An Ingredient</button>
      {ingredientInputs}
      <input type="submit" value="Submit"/>
    </form>
  );
};
export default RecipeForm;

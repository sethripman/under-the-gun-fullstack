import React, { useState } from 'react';


const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [directions, setDirections] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const ingredientInputs = ingredients.map(({ name, amount, unit }, i) => {
    const handleChange = (key) => ({ target }) => setIngredients(oldIngredients => oldIngredients.map((oi, oiIndex) => {
      if(oiIndex === i) return { ...oi, [key]: target.value };
      return oi;
    }));
    return (
      <div key={i} >
        <input type="text" value={name} onChange={handleChange('name')} placeholder="Ingredient Name"/>
        <input type="number" value={amount} onChange={handleChange('amount')} placeholder="Amount" />
        <select defaultValue={unit} onChange={handleChange('unit')}>
          <option value="cup">Cup</option>
          <option value="tablespoon">Tablespoon</option>
          <option value="teaspoon">Teaspoon</option>
          <option value="ounce">Ounce</option>
          <option value="grams">Grams</option>
        </select>

      </div>
    );
  });
  return (
    <form>
      <label>
        <input type="text"  placeholder="Recipe Name"/>
      </label>
      <label>
        <textarea type="text"  placeholder="Directions"/>
      </label>
      <button type="button" onClick={() => setIngredients(oi => [...oi, { name: '', amount: 0, unit: 'grams' }])}>Add An Ingredient</button>
      {ingredientInputs}
      <input type="submit" value="Submit"/>
    </form>
  );
};
export default RecipeForm;

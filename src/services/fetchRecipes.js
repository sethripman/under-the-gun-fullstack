export const getRecipes = () => {
  return fetch('https://fathomless-meadow-03057.herokuapp.com/api/v1/recipes')
    .then(res => {
      if(res.ok) return res.json();
      throw `Response: ${res.status}`;
    });
};

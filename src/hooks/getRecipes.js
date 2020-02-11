import { useState, useEffect } from 'react';
import { getRecipes } from '../services/fetchRecipes';

export const useRecipes = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then(resObject => {
        setRecipes(resObject);
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, recipes };
};

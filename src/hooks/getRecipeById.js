import { useEffect, useState } from 'react';
import { getRecipeById } from '../services/fetchRecipeId';

export const useRecipeById = id => {
  const [loading, setLoading] = useState(true);
  const [recipeDetail, setRecipeDetail] = useState({});

  useEffect(() => {
    setLoading(true);
    getRecipeById(id)
      .then(resObject => {
        setRecipeDetail(resObject);
      })
      .finally(() => setLoading(false));
  }, [id]);
  return { loading, recipeDetail };
};

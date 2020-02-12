import React from 'react';
import PropTypes from 'prop-types';
import { useRecipeById } from '../../hooks/getRecipeById';
import { useHistory } from 'react-router-dom';
import styles from './RecipeDetail.css';

const RecipeDetail = ({ match }) => {
  const history = useHistory();
  const { recipeDetail, loading } = useRecipeById(match.params.recipe_id);
  const handleClick = event => {
    return fetch(
      `https://fathomless-meadow-03057.herokuapp.com/api/v1/recipes/${match.params.recipe_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          origin: true
        }
      }
    )
      .then(res => Promise.all([res.ok, res.json()]))
      .then(([ok, json]) => {
        if (!ok) throw json;
        return json;
      })
      .then(() => {
        history.replace('/');
      });
  };

  if (loading)
    return (
      <div className={styles.spinner}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
      </div>
    );

  const ingredientsArray = recipeDetail.ingredients.map(ingredient => (
    <li key={ingredient.name}>
      <p>
        {ingredient.amount} {ingredient.measurement}s of {ingredient.name}
      </p>
    </li>
  ));

  const mappedDirections = recipeDetail.directions.map((direction, index) => (
    <li key={index}>
      <p>
        {index + 1}. {direction}
      </p>
    </li>
  ));

  return (
    <article key={recipeDetail._id} className={styles.recipe}>
      <h3 className={styles.recipeTitle}>{recipeDetail.name}</h3>
      <div className={styles.directionBox}>
        <ul className={styles.directions}>
          {ingredientsArray}
          {mappedDirections}
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={handleClick}>
          Delete
        </button>
      </div>
    </article>
  );
};
export default RecipeDetail;

RecipeDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipe_id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

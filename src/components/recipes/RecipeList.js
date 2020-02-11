import React from 'react';
// import PropTypes from 'prop-types';
import { useRecipes } from '../../hooks/getRecipes';
import { Link } from 'react-router-dom';
import styles from './Recipe.css';

const RecipeList = () => {
  const { recipes, loading } = useRecipes();

  if(loading)
    return (
      <div className={styles.spinner}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
      </div>
    );

  if(!recipes.length)
    return <p className={styles.error}>There are no recipes in the database</p>;

  const recipeList = recipes.map(recipe => {
    return (
      <Link className={styles.Link} key={recipe._id} to={''}>
        <article className={styles.recipe}>
          <div className={styles.img_container}>
            <img
              className={styles.recipe_image}
              src='http://placekitten.com/200/300'
              alt='recipe cover'
            />
          </div>
          <h3 className={styles.recipe_name}>{recipe.name}</h3>
        </article>
      </Link>
    );
  });
  return <ul className={styles.ul}>{recipeList}</ul>;
};

export default RecipeList;

// RecipeList.PropTypes = {
//   _id: PropTypes.String.isRequired,
//   name: PropTypes.string.isRequired
// };

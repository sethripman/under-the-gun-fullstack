import React from 'react';
import PropTypes from 'prop-types';
import { useRecipes } from '../../hooks/getRecipes';
import { Link } from 'react-router-dom';
import styles from './RecipeList.css';
import img from '../image/darki.jpeg';
// import { FaSkullCrossbones } from 'react-icons/fa';

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
      <Link
        key={recipe._id}
        className={styles.Link}
        to={`/recipeDetail/${recipe._id}`}
      >
        <article className={styles.recipe}>
          <div className={styles.img_container}>
            <img className={styles.recipe_image} src={img} alt='recipe cover' />
          </div>
          <h3 className={styles.recipe_name}>{recipe.name}</h3>
        </article>
      </Link>
    );
  });
  return <ul className={styles.ul}>{recipeList}</ul>;
};

export default RecipeList;

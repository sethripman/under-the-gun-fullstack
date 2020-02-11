// import React from 'react';
// import { useRecipeById } from '../../hooks/getRecipeById';
// import styles from './RecipeDetail.css';

// const RecipeDetail = () => {
//   const { recipeDetail, loading } = useRecipeById('5e41e4a721288700179bb29f');

//   if(loading)
//     return (
       
//       <div className={styles.spinner}>
//         <div className={styles.bounce1}></div>
//         <div className={styles.bounce2}></div>
//       </div>
      
//     );

// const ingredientsArray = recipeDetail.ingredients.(ingredient => {
//   return [ingredient.amount, ingredient.measurement, ingredient.name];
// });

// const mappedDirections = directionDetail.forEach((direction, index) =>
//    <li key={index}>
//      <p>direction.</p>
//    </li>
//    );

//   const recipeDetail = mungedDetailArray => {
//     return (
//       // <Link className={styles.Link} key={recipeDetail._id} to={'/'}>
//         <article className={styles.recipe}>
//           <h3 className={styles.recipe_name}>{recipe.name}</h3>
//           <ul className={styles.ingredient_list}>{mappedIngredients}</ul>
//           <ul className={styles.direction_list}>{mappedDirections}</ul>
//         </article>
//       // </Link>
//     );
//   });
//   return <ul className={styles.ul}>{recipeList}</ul>;
// };

// export default RecipeList;

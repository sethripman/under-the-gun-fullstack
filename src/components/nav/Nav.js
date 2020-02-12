import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../image/skull.png';
import styles from './Nav.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      {/* <img src={logo} alt='' /> */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Recipes to Die For</h1>
      </div>
      <ul className={styles.nav_links}>
        <NavLink to='/' className={styles.nav_link}>
          <li>Recipes</li>
        </NavLink>
        <NavLink to='/recipeForm' className={styles.nav_link}>
          <li>Add Recipe</li>
        </NavLink>
      </ul>
    </nav>
  );
};
export default Nav;

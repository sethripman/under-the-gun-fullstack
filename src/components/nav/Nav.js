import React, { Link } from 'react';
import logo from '../image/skull.png';
import styles from './Nav.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <img src={logo} alt='' />
      <h1 className={styles.title}>Recipes to Die For</h1>

      <ul className={styles.nav_links}>
        <li>
          {/* <Link to='/home' className={styles.nav_link}>
            Home
          </Link> */}
        </li>
      </ul>
      
    </nav>
  );
};
export default Nav;

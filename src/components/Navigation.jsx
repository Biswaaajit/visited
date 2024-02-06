import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
function Navigation() {
  return (
    <div className={styles.navbar}>
      <div>
        <Link to="/">
          <div className={styles.logo}>
            <img src="./logo.png" />
            <p>
              stop<span>Over</span>
            </p>
          </div>
        </Link>
      </div>
      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink to="/product">PRODUCTS</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">PRICING</NavLink>
          </li>
          <li>
            <Link to="/login">
              <button>LOG IN</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;

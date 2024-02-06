import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./LeftSide.module.css";
function LeftSide() {
  return (
    <div className={styles.cover}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo.png" />
          <p>
            stop<span>Over </span>
          </p>
        </Link>
      </div>
      <Tab />
      <Outlet />
      <footer className={styles.footer}>
        <p>© Copyright by 2013 stopOver inc.</p>
      </footer>
    </div>
  );
}
function Tab() {
  return (
    <div className={styles.tab}>
      <NavLink to="cities">Cities</NavLink>
      <NavLink to="countries">Countries</NavLink>
    </div>
  );
}

export default LeftSide;

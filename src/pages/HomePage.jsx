import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <div className={styles.cover}>
      <Navigation />
      <AboutHome />
    </div>
  );
}
function AboutHome() {
  return (
    <div>
      <div className={styles.about}>
        <h1>You travel the World.</h1>
        <h1>StopOver will keep track of your adventures.</h1>
      </div>
      <div className={styles.tagline}>
        <p>
          A world map that keeps tracks of your footsteps into every city you
          think of. Never forget your wonderful experiences and show them your
          friends and family how you have wondered around the world.
        </p>
        <Link to="track">
          <button>Start Tracking Now</button>
        </Link>
      </div>
    </div>
  );
}
export default HomePage;

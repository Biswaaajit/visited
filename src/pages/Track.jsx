import styles from "./Track.module.css";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
function Track() {
  return (
    <div className={styles.cover}>
      <LeftSide />
      <RightSide />
    </div>
  );
}

export default Track;

import Navigation from "../components/Navigation";
import styles from "./Pricing.module.css";
function Pricing() {
  return (
    <div className={styles.cover}>
      <Navigation />
      <AboutPricing />
    </div>
  );
}
function AboutPricing() {
  return (
    <div className={styles.about}>
      <img src="./pricing.jpg" />
      <div>
        <h1>Enjoy The Benefit Just At ₹150/month.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        </p>
      </div>
    </div>
  );
}
export default Pricing;

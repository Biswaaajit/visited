import { useState } from "react";
import Navigation from "../components/Navigation";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className={styles.cover}>
      <Navigation />
      <Form />
    </div>
  );
}
function Form() {
  const [email, setEmail] = useState("biswa@gmail.com");
  const [password, setPassword] = useState("rider");
  return (
    <div className={styles.form}>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to="/track">
        <button>Login</button>
      </Link>
    </div>
  );
}
export default Login;

import {useState} from "react";
import styles from "../styles/Home.module.css";

function Login({setUsername}) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUsername(name);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Willkommen im Mittelalterlichen Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Gib deinen Namen ein..."
        />
        <button type="submit">Zum Chat</button>
      </form>
    </div>
  );
}

export default Login;

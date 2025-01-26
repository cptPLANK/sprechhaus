"use client";

import {useState, useEffect} from "react";
import Chat from "../components/Chat";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Beim ersten Laden den Username aus dem LocalStorage holen
    const storedUsername = localStorage.getItem("medieval-chat-username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSetUsername = (name) => {
    // Username im LocalStorage speichern
    localStorage.setItem("medieval-chat-username", name);
    setUsername(name);
  };

  return (
    <div className={styles.container}>
      {!username ? (
        <Login setUsername={handleSetUsername} />
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

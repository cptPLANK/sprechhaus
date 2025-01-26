import React, {useState, useEffect} from "react";
import styles from "../styles/Home.module.css";

function Chat({username}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    const response = await fetch("/api/messages");
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    // Polling alle 2 Sekunden für neue Nachrichten
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const convertToMedieval = async (text) => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text}),
      });

      if (!response.ok) {
        throw new Error("Übersetzung fehlgeschlagen");
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Translation error:", error);
      // Fallback zur einfachen Umwandlung wenn die API fehlschlägt
      return (
        text
          .replace(/ich/g, "ich, edler Recke,")
          .replace(/hallo/g, "Seid gegrüßet")
          .replace(/danke/g, "Habt Dank")
          .replace(/bitte/g, "ich flehe Euch an") + " 🗡️"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        // Zeige Lade-Animation für die Nachricht
        const tempId = Date.now();
        setMessages((prev) => [
          ...prev,
          {
            id: tempId,
            text: "Übersetzt Nachricht... 📜",
            username,
            isLoading: true,
          },
        ]);

        const medievalMessage = await convertToMedieval(newMessage);

        // Entferne die Lade-Nachricht
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId));

        await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: medievalMessage,
            username,
          }),
        });

        setNewMessage("");
        fetchMessages();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("medieval-chat-username");
    window.location.reload();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h2>Willkommen, {username}</h2>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Verlassen
        </button>
      </div>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.username === username ? styles.ownMessage : ""
            }`}
          >
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Schreibe eine Nachricht..."
        />
        <button type="submit">Senden</button>
      </form>
    </div>
  );
}

export default Chat;

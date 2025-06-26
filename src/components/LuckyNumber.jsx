import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [message, setMessage] = useState("Lucky Number 🎲");

  function handleClick() {
    const newNumber = Math.floor(Math.random() * 40) + 1;

    if (luckyNumbers.includes(newNumber)) {
      setMessage(`Já foi sorteado! (${newNumber})`);
    } else {
      setLuckyNumbers([...luckyNumbers, newNumber]);
      setMessage(`Lucky Number = ${newNumber}`);
    }
  }

  return (
    <div className={styles.container}>
      <h1>{message}</h1>

      <button className={styles.button} onClick={handleClick}>
        I'm Feeling Lucky Today!
      </button>

      <div className={styles.result}>
        <h2>Números sorteados:</h2>
        <p>{luckyNumbers.join(", ") || "Nenhum número ainda."}</p>
      </div>
    </div>
  );
}

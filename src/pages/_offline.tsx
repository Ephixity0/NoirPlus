import { useState } from "react";
import styles from "@/styles/Settings.module.scss";

const choices = ["Rock", "Paper", "Scissors"];

const OfflinePage = () => {
  const [userChoice, setUserChoice] = useState(null);  // Removed space
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);  // Removed space
  const [computerScore, setComputerScore] = useState(0);

  const playGame = (userSelection) => {
    const computerSelection = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(userSelection);  // Fixed function name
    setComputerChoice(computerSelection);
    determineWinner(userSelection, computerSelection);
  };

  const determineWinner = (userSelection, computerSelection) => {
    if (userSelection === computerSelection) {
      setResult("It's a tie!");
    } else if (
      (userSelection === "Rock" && computerSelection === "Scissors") ||
      (userSelection === "Paper" && computerSelection === "Rock") ||
      (userSelection === "Scissors" && computerSelection === "Paper")
    ) {
      setResult("You win!");
      setUserScore(userScore + 1);  // Fixed function name
    } else {
      setResult("Computer wins!");
      setComputerScore(computerScore + 1);
    }
  };

  const resetGame = () => {
    setUserChoice(null);  // Fixed function name
    setComputerChoice(null);
    setResult("");
  };

  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img
          src="/images/63d168593f214df1ae64b04babe19c89-free.png"
          alt="Noir+ Logo"
        />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.errorData}>
        <h1>503</h1>
        <p>No Internet</p>
        <p>Try the game below while you wait!</p>
        <details>
          <summary>No Internet/ Unavailable</summary>
          <h4>This can happen for a variety of reasons, including:</h4>
          <p>1. Server maintenance running</p>
          <p>2. Server is overloaded due to unexpected traffic surges or attacks</p>
          <p>3. Client-side DNS configuration error</p>
          <p>4. The connection to the internet has been lost or interfered with</p>
          <p>5. The site has been deleted or moved</p>
          <p>6. The site is experiencing too much traffic and is temporarily down</p>
          <h4>Try:</h4>
          <p>1. Checking the network cables, modem, and router</p>
          <p>2. Reconnecting to Wi-Fi</p>
          <p>3. Running Windows Network Diagnostics</p>
        </details>
      </div>
      <div className={styles.gameContainer}>
        <h2>Rock, Paper, Scissors</h2>
        <div className={styles.choices}>
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className={styles.choiceButton}
            >
              {choice}
            </button>
          ))}
        </div>
        {userChoice && computerChoice && (
          <div className={styles.result}>
            <p>You chose: {userChoice}</p>
            <p>Computer chose: {computerChoice}</p>
            <h3>{result}</h3>
          </div>
        )}
        <div className={styles.scoreboard}>
          <p>User Score: {userScore}</p>
          <p>Computer Score: {computerScore}</p>
        </div>
        <button onClick={resetGame} className={styles.resetButton}>Play Again</button>
      </div>
    </div>
  );
};

export default OfflinePage;

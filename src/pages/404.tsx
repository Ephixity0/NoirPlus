import { useState } from "react";
import styles from "@/styles/Settings.module.scss";

const ErrorPage = () => {
  const [userChoice, setUser Choice] = useState<string | null>(null); // Fixed variable name
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [userScore, setUser Score] = useState<number>(0); // Fixed variable name
  const [computerScore, setComputerScore] = useState<number>(0);

  const choices = ["Treasure", "Trap", "Nothing"]; // Example choices for the game

  const playGame = (userSelection: string) => {
    const computerSelection = choices[Math.floor(Math.random() * choices.length)];
    setUser Choice(userSelection); // Fixed variable name
    setComputerChoice(computerSelection);
    determineWinner(userSelection, computerSelection);
  };

  const determineWinner = (userSelection: string, computerSelection: string) => {
    if (userSelection === computerSelection) {
      setResult("You both found nothing!");
    } else if (
      (userSelection === "Treasure" && computerSelection === "Nothing") ||
      (userSelection === "Nothing" && computerSelection === "Trap") ||
      (userSelection === "Trap" && computerSelection === "Treasure")
    ) {
      setResult("You win! You found the treasure!");
      setUser Score((prevScore) => prevScore + 1); // Fixed variable name
    } else {
      setResult("Computer wins! You fell into a trap!");
      setComputerScore((prevScore) => prevScore + 1);
    }
  };

  const resetGame = () => {
    setUser Choice(null); // Fixed variable name
    setComputerChoice(null);
    setResult("");
  };

  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img src="/images/63d168593f214df1ae64b04babe19c89-free.png" alt="Noir+ Logo" />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.errorData}>
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
      <div className={styles.howToPlay}>
        <h2>How to Play</h2>
        <p>
          In this game, you will choose between three options: <strong>Treasure</strong>, <strong>Trap</strong>, and <strong>Nothing</strong>.
        </p>
        <p>
          - If you choose <strong>Treasure</strong> and the computer chooses <strong>Nothing</strong>, you win!
        </p>
        <p>
          - If you choose <strong>Nothing</strong> and the computer chooses <strong>Trap</strong>, you win!
        </p>
        <p>
          - If you choose <strong>Trap</strong> and the computer chooses <strong>Treasure</strong>, you win!
        </p>
        <p>
          - If both you and the computer choose the same option, it's a tie!
        </p>
        <p>
          - If you choose <strong>Treasure</strong> and the computer chooses <strong>Trap</strong>, or if you choose <strong>Trap</strong> and the computer chooses <strong>Nothing</strong>, the computer wins!
        </p>
      </div>
      <div className={styles.gameContainer}>
        <h2>Treasure Hunt Adventure</h2>
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

export default ErrorPage;

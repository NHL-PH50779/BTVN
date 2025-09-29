import React, { useState } from "react";
import DifficultySelector from "./DifficultySelector";
import GuessInput from "./GuessInput";
import Hint from "./Hint";
import HistoryList from "./HistoryList";
import ResultMessage from "./ResultMessage";

export default function GuessingGame() {
  const [difficulty, setDifficulty] = useState("easy");
  const [secret, setSecret] = useState(null);
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("playing");
  const [attemptsLeft, setAttemptsLeft] = useState(10);

  const getRange = () => {
    if (difficulty === "easy") return 50;
    if (difficulty === "medium") return 100;
    return 200;
  };

  const startGame = () => {
    const max = getRange();
    setSecret(Math.floor(Math.random() * max) + 1);
    setGuess("");
    setHistory([]);
    setStatus("playing");
    setAttemptsLeft(10);
  };

  const handleGuess = () => {
    if (!guess || status !== "playing") return;

    const g = parseInt(guess, 10);
    if (isNaN(g)) return;

    let newHistory = [...history, g];
    setHistory(newHistory);

    if (g === secret) {
      setStatus("win");
      return;
    }

    const newAttempts = attemptsLeft - 1;
    setAttemptsLeft(newAttempts);

    if (newAttempts <= 0) {
      setStatus("lose");
    }
  };

  const getHint = () => {
    if (history.length === 0 || status !== "playing") return "";
    const lastGuess = history[history.length - 1];
    if (lastGuess < secret) return "Số bí mật lớn hơn!";
    if (lastGuess > secret) return "Số bí mật nhỏ hơn!";
    return "";
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Trò chơi đoán số</h1>

      <DifficultySelector
        difficulty={difficulty}
        onChange={setDifficulty}
        onStart={startGame}
      />

      {secret && (
        <>
          <p className="mb-2">Bạn có {attemptsLeft} lượt đoán.</p>

          {status === "playing" && (
            <>
              <GuessInput
                guess={guess}
                onChange={setGuess}
                onGuess={handleGuess}
              />
              <Hint hint={getHint()} />
            </>
          )}

          <ResultMessage status={status} secret={secret} />

          <HistoryList history={history} secret={secret} range={getRange()} />
        </>
      )}
    </div>
  );
}

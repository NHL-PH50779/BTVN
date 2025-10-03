import { useState } from "react";
import "./App.css";
import ListCard from "../data"; // 12 lá bài từ data.js
import LuckyCart from "./components/LuckyCart/LuckyCart";

function App() {
  function initCards() {
    const randomIndex = Math.floor(Math.random() * ListCard.length);
    return ListCard.map((card, index) => ({
      ...card,
      isFlipped: false,
      isLucky: index === randomIndex, // random 1 lá vàng
    }));
  }

  const [cards, setCards] = useState(initCards);
  const [turns, setTurns] = useState(3);
  const [status, setStatus] = useState("playing");

  function handleFlip(id) {
    if (status !== "playing" || turns === 0) return;

    // kiểm tra nếu đã lật rồi thì không lật lại nữa
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    if (clickedCard.isLucky) {
      setStatus("win");
    } else {
      setTurns((prev) => {
        if (prev - 1 === 0) {
          setStatus("lose");
        }
        return prev - 1;
      });
    }
  }

  function resetGame() {
    setCards(initCards);
    setTurns(3);
    setStatus("playing");
  }

  return (
    <div className="game">
      <h1>🎴 Lật bài may mắn </h1>{status === "win" && <h2>🎉 Bạn đã thắng! 🎉</h2>}
      {status === "lose" && <h2> Bạn đã thua!</h2>}
      <p>Lượt còn lại: {turns}</p><button onClick={resetGame}>Chơi lại</button>
      
      <div className="cards">
        {cards.map((card) => (
          <LuckyCart key={card.id} card={card} onFlip={handleFlip} />
        ))}
      </div>




    </div>
  );
}

export default App;

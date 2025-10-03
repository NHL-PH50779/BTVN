import "./LuckyCart.css";

function LuckyCart({ card, onFlip }) {
  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""}`}
      onClick={() => {
        if (!card.isFlipped) onFlip(card.id);
      }}
    >
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">
          {card.isLucky ? (
            <span className="lucky">🌟</span>
          ) : (
            <span className="normal">❌</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LuckyCart;

import React, { useState } from "react";
import "./RaceCube.css";

const RaceCube = () => {
    const [numPlayers, setNumPlayers] = useState(2);
    const [positions, setPositions] = useState([]);
    const [turn, setTurn] = useState(0);
    const [history, setHistory] = useState([]);
    const [winner, setWinner] = useState(null);
    const [started, setStarted] = useState(false);

    const startGame = () => {
        if (numPlayers < 2 || numPlayers > 6) {
            alert("Số người chơi phải từ 2 đến 6");
            return;
        }
        setPositions(Array(numPlayers).fill(0));
        setTurn(0);
        setHistory([]);
        setWinner(null);
        setStarted(true);
    };

    const rollDice = () => {
        if (winner !== null) return;

        const dice = Math.floor(Math.random() * 6) + 1;
        let newPositions = [...positions];
        newPositions[turn] = Math.min(newPositions[turn] + dice, 30);

        setPositions(newPositions);
        setHistory([
            ...history,
            `Người chơi ${turn + 1} tung được ${dice} (đi đến ô ${newPositions[turn]})`,
        ]);

        if (newPositions[turn] === 30) {
            setWinner(turn);
            return;
        }

        if (dice !== 6) {
            setTurn((turn + 1) % numPlayers);
        }
    };

    const resetGame = () => {
        setPositions([]);
        setTurn(0);
        setHistory([]);
        setWinner(null);
        setStarted(false);
    };

    return (
        <div className="race-container">
            {!started ? (
                <div className="setup">
                    <label>
                        Nhập số người chơi (2-6):{" "}
                        <input
                            type="number"
                            value={numPlayers}
                            onChange={(e) => setNumPlayers(Number(e.target.value))}
                            min="2"
                            max="6"
                        />
                    </label>
                    <button onClick={startGame}>Bắt đầu</button>
                </div>
            ) : (
                <>
                    <h3>Lượt của: Người chơi {turn + 1}</h3>
                    <div className="board">
                        {positions.map((pos, index) => (
                            <div key={index} className="player">
                                Người chơi {index + 1}: Ô {pos}
                            </div>
                        ))}
                    </div>
                    <button onClick={rollDice} disabled={winner !== null}>
                        Tung xúc xắc
                    </button>
                    <button onClick={resetGame}>Chơi lại</button>

                    {winner !== null && (
                        <h2 className="winner">🎉 Người chơi {winner + 1} thắng! 🎉</h2>
                    )}

                    <div className="history">
                        <h3>Lịch sử tung xúc xắc:</h3>
                        <ul>
                            {history.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default RaceCube;

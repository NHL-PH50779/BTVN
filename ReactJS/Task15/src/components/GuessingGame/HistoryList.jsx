import React from "react";

export default function HistoryList({ history, secret, range }) {
  const getColor = (num) => {
    const diff = Math.abs(secret - num);
    const threshold = range * 0.3;
    return diff <= threshold ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="mt-4">
      <h2 className="font-semibold">Lịch sử đoán:</h2>
      <ul className="list-disc ml-6">
        {history.map((num, i) => (
          <li key={i} className={getColor(num)}>
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}

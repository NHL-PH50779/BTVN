import React from "react";

export default function GuessInput({ guess, onChange, onGuess }) {
  return (
    <div className="mb-4">
      <input
        type="number"
        value={guess}
        onChange={(e) => onChange(e.target.value)}
        className="border p-1 rounded mr-2"
      />
      <button
        onClick={onGuess}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        Đoán
      </button>
    </div>
  );
}

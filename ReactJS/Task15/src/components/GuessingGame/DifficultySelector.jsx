import React from "react";

export default function DifficultySelector({ difficulty, onChange, onStart }) {
  return (
    <div className="mb-4">
      <label className="mr-2">Độ khó:</label>
      <select
        value={difficulty}
        onChange={(e) => onChange(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="easy">Dễ (1-50)</option>
        <option value="medium">Trung bình (1-100)</option>
        <option value="hard">Khó (1-200)</option>
      </select>
      <button
        onClick={onStart}
        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Bắt đầu
      </button>
    </div>
  );
}

import React from "react";

export default function ResultMessage({ status, secret }) {
  if (status === "win") {
    return <p className="text-green-600 font-bold">🎉 Bạn đã đoán đúng!</p>;
  }
  if (status === "lose") {
    return (
      <p className="text-red-600 font-bold">
        😢 Bạn thua rồi. Số bí mật là {secret}.
      </p>
    );
  }
  return null;
}

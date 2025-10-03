import React from "react";

function getTitle(score) {
  if (score < 3) return { title: "Yếu", color: "red" };
  if (score < 6) return { title: "Trung bình", color: "orange" };
  if (score <= 8) return { title: "Khá", color: "blue" };
  if (score < 9.5) return { title: "Giỏi", color: "green" };
  if (score < 10) return { title: "Xuất sắc", color: "purple" };
  return { title: "Hoàn hảo", color: "black" };
}

const StudentRow = ({ student }) => {
  const { title, color } = getTitle(student.score);
  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.fullName}</td>
      <td>{student.gender === "male" ? "Nam" : "Nữ"}</td>
      <td>{student.age}</td>
      <td>{student.major}</td>
      <td>{student.score}</td>
      <td style={{ color, fontWeight: "bold" }}>{title}</td>
    </tr>
  );
};

export default StudentRow;

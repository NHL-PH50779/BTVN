import React from "react";

const OutStandingStudent = ({ student }) => (
  <div style={{ border: "2px solid gold", padding: "12px", marginBottom: "20px", borderRadius: "8px" }}>
    <h2>Sinh viên tiêu biểu</h2>
    <p><b>{student.fullName}</b> ({student.major})</p>
    <p>Điểm trung bình: <b>{student.score}</b></p>
  </div>
);

export default OutStandingStudent;

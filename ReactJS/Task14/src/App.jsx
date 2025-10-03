import React from "react";
import students from "./Students";
import OutStandingStudent from "./pages/OutStandingStudent";
import StudentList from "./pages/StudentList";
import "./App.css";

function App() {
  const outstanding = students.reduce((max, s) => (s.score > max.score ? s : max), students[0]);

  return (
    <div className="App" style={{ maxWidth: "900px", margin: "0 auto", fontFamily: "Arial" }}>
      <OutStandingStudent student={outstanding} />
      <StudentList students={students} />

      <div style={{ marginTop: "20px" }}>
        <h3>Phân loại danh hiệu</h3>
        <ul>
          <li style={{ color: "red" }}>Yếu: &lt; 3</li>
          <li style={{ color: "orange" }}>Trung bình: 3 - 6</li>
          <li style={{ color: "blue" }}>Khá: 6 - 8</li>
          <li style={{ color: "green" }}>Giỏi: 8 - 9.5</li>
          <li style={{ color: "purple" }}>Xuất sắc: ≥ 9.5</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

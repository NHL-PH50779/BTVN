import React from "react";
import StudentRow from "./StudentRow";

const StudentList = ({ students }) => (
  <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
    <thead style={{ background: "#f2f2f2" }}>
      <tr>
        <th>Mã SV</th>
        <th>Họ và tên</th>
        <th>Giới tính</th>
        <th>Tuổi</th>
        <th>Chuyên ngành</th>
        <th>Điểm TB</th>
        <th>Danh hiệu</th>
      </tr>
    </thead>
    <tbody>
      {students.map(student => <StudentRow key={student.id} student={student} />)}
    </tbody>
  </table>
);

export default StudentList;

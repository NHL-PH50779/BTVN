const students = [
  { id: 1, name: "Nguyễn Văn A", age: 20, city: "Hà Nội" },
  { id: 2, name: "Trần Thị B", age: 19, city: "TP.HCM" },
  { id: 3, name: "Lê Văn C", age: 21, city: "Đà Nẵng" },
];

let tableHTML = `
        <tr>
          <th>id</th>
          <th>Tên</th>
          <th>Tuổi</th>
          <th>Thành Phố</th>
        </tr>
      `;

for ( i = 0; i < students.length; i++) {
  tableHTML += `
          <tr>
            <td>${students[i].id}</td>
            <td>${students[i].name}</td>
            <td>${students[i].age}</td>
            <td>${students[i].city}</td>
          </tr>
        `;
}

const dataTable = document.getElementById("dataTable");
dataTable.innerHTML = tableHTML;

dataTable.style.border = "1px solid black";
const cell = dataTable.getElementsByTagName("td");
const header = dataTable.getElementsByTagName("th");

for ( i = 0; i < cell.length; i++) {
  cell[i].style.border = "1px solid black";
}
for ( i = 0; i < header.length; i++) {
  header[i].style.border = "1px solid black";
}

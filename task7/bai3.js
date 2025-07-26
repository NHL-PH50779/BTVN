console.log("Bài 3");

const students = [
  { name: "An", scores: [8, 7.5, 9] },
  { name: "Bình", scores: [6, 5.5, 7] },
  { name: "Chi", scores: [9, 9.5, 10] },
];

const studentAverages = students.map(student => {
  let tong = 0;
  student.scores.forEach(score => {
    tong += score;
  });
  let average = tong / student.scores.length;
  average = Math.round(average * 10) / 10;

  return {
    name: student.name,
    average: average
  };
});

console.log(studentAverages);

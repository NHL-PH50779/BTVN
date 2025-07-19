function nhapnn() {
  let n = Number(prompt("nhập n"));
  let character = prompt("nhập character");
  if (isNaN(n) || n >= 100) {
    console.log(
      "Dữ liệu không hợp lệ. Vui lòng nhập n là số nguyên dương < 100 và character là 1 ký tự."
    );
    return;
  }

  printChristmasTree(n, character);
}
function printChristmasTree(n, character) {
  for (let i = 0; i < n; i++) {
    let kc = "";
    for (let j = 0; j < n - i - 1; j++) {
      kc += " ";
    }
    for (let u = 0; u < 2 * i + 1; u++) {
      kc += character;
    }
    console.log(`${kc}`);
  }
  let cc = "";
  for (e = 0; e < n - 1; e++) {
    cc += " ";
  }
  cc += character;
  console.log(cc);
}

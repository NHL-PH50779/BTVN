function nhapn() {
  let n = Number(prompt("nhập n"));
  if(isNaN(n)){
    confirm("hay nhập đúng định dạng")
  }
  printSquareNumber(n);
}
function printSquareNumber(n) {
  for (let i = 2; i <= n; i++) {
    let int = Math.sqrt(i);
    if (Number.isInteger(Math.sqrt(i))) {
      console.log(i);
    }
  }
}

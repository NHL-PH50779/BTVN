function input() {
  let n = Number(prompt("nhập n"));
  if(isNaN(n)){
    confirm("hay nhập đúng định dạng")
  }
  printMultiplicationTable(n);
}
function printMultiplicationTable(n) {
    for(let i=1;i<=10;i++){
        console.log(`${n}x${i}=${n*i}`);
    }
  // Xử lý và in ra kết quả
}

// Output:



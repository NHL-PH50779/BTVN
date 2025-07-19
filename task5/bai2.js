function inp() {
  let n = Number(prompt("nhập n"));
  if (isNaN(n) ||n<2) {
    confirm("hay nhập đúng định dạng");
    return;
  }
  printPrimeNumber(n);
}

function printPrimeNumber(n) {
  for (let i = 2; i <= n; i++) {
    if (checknumber(i)) {
      console.log(i);

    }
  }
}

function checknumber(a) {
  for (let i = 2; i <= Math.sqrt(a); i++) {
    if (a % i === 0) {
      return false;
    }
  }
  return true;
}

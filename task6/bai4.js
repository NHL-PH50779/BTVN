

function findMinMaxAverage(arr) {
  let sln = arr[0]; // số lớn nhất
  let isl = 0;       // vị trí số lớn nhất
  let snn = arr[0]; // số nhỏ nhất
  let isn = 0;       // vị trí số nhỏ nhất

  let primeSum = 0;
  let primeCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > sln) {
      sln = arr[i];
      isl = i;
    }
    if (arr[i] < snn) {
      snn = arr[i];
      isn = i;
    }

    if (Checknumber(arr[i])) {
      primeSum += arr[i];
      primeCount++;
    }
  }

const primeAverage = primeCount > 0 ? +(primeSum / primeCount) : null;    

  const result = {
    số_lớn_nhất: sln,
    vị_trí: isl,
    số_nhỏ_nhất: snn,
    vị_trí: isn,
    TBC_số_nguyên_tố: primeAverage
  };

  console.log(result);
  return result;
}
function Checknumber(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}  console.log("bài 4");

// Output:
findMinMaxAverage([3, 1, 4, 1, 5, 9, 2, 6]); // Output: {max: 9, maxIndex: 5, min: 1, minIndex: 1, primeAverage: 3.33 }
findMinMaxAverage([5, 5, 2, 2, 1]); // Output: {max: 5, maxIndex: 0, min: 1, minIndex: 4, primeAverage: 3.5 }
findMinMaxAverage([-3, 7, -8, 11, 0]); // Output: {max: 11, maxIndex: 3, min: -8, minIndex: 2, primeAverage: 9 }
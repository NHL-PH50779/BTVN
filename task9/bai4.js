console.log("bai 4");
Array.prototype.map2 = function(callback) {
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback(this[i], i, this);
    }
  }
  return result;
};
// Sample 1
const arr1 = [1, 2, 3, 4, 5];
const ex = arr1.map2((value) => value * 2);

console.log(ex); // [2, 4, 6, 8, 10]
console.log(ex.length); // 5

// Sample 2
const arr2 = [1, , , , 5]; // Có phần tử trống
const ex2 = arr2.map2((value) => value * 2);

console.log(ex2); // [2, , , , 10]
console.log(ex2.length); // 5
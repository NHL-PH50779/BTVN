console.log("bai 5");
Array.prototype.forEach2 = function (callback) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    if (i in this) {
      callback(this[i], i, this);
    }
  }
};

// Sample usage
const arr = [1, 2, 3, 4, 5];

arr.forEach2((value, index) => {
  console.log(`Value at index ${index}: ${value}`);
});

// Output:
// Value at index 0: 1
// Value at index 1: 2
// Value at index 2: 3
// Value at index 3: 4
// Value at index 4: 5

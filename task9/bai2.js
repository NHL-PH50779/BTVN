// Input:
console.log("bai 2");
const fruits = [
  "apple",
  "banana",
  "kiwi",
  "kiwi",
  "banana",
  "orange",
  "apple",
  "kiwi",
];

function removeDuplicate(arr) {
  // Xử lý và in ra kết quả
  return arr.reduce((acc, cur) => {
    const checkNan = typeof cur === "number" && isNaN(cur);
    const hasNaN = acc.some((item) => typeof item === "number" && isNaN(item));
    if (checkNan && hasNaN) return acc;
    if (
      (cur === null && acc.includes(null)) ||
      (cur === undefined && acc.includes(undefined))
    ) {
      return acc;
    }
    if (!acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// Output:
const result1 = removeDuplicate(fruits);
console.log(result1); // ["apple", "banana", "kiwi", "orange"]

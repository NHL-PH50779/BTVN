console.log("Bài 2");

function findSecondLargestNumber(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return -1;
  }
  const uniqueArr = [...new Set(arr)];

  if (uniqueArr.length < 2) {
    return -1;
  }
  uniqueArr.sort((a, b) => b - a);

  return uniqueArr[1];
}

// Test
console.log(findSecondLargestNumber([1, 2, 3, 4, 5])); // 
console.log(findSecondLargestNumber([1, 1, 1]));  
console.log(findSecondLargestNumber([1])); // -1);
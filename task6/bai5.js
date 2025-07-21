function insertNumber(arr, num) {
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    let x = arr[i];
    if (typeof x === 'number' && !isNaN(x)) {
      newArr.push(x);
    }
  }

  for (let i = 0; i < newArr.length - 1; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
      if (newArr[i] > newArr[j]) {
        let temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
      }
    }
  }

  if (typeof num === 'number' && !isNaN(num)) {
    let index = 0;
    while (index < newArr.length && newArr[index] < num) {
      index++;
    }

    let result = [];
    for (let i = 0; i < index; i++) {
      result.push(newArr[i]);
    }
    result.push(num);
    for (let i = index; i < newArr.length; i++) {
      result.push(newArr[i]);
    }
    newArr = result;
  }
  console.log(newArr);
}  console.log("bài 5");

insertNumber([1, 3, 5, 7, 9], 6); // Output: [1, 3, 5, 6, 7, 9]
insertNumber([3, "hello", 1, NaN, 4, null], 2); // Output: [1, 2, 3, 4]
insertNumber([], 5); // Output: [5]
insertNumber([-1, 10, -5, "abc"], -3); // Output: [-5, -3, -1, 10]
insertNumber([5, 2, 8], NaN); // Output: [2, 5, 8]
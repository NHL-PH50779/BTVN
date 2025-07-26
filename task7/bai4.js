console.log("Bài 4");

function findCommonElement(arr1, arr2) {
  
    const unique = [];
  const unique1 = [];
  for (let i = 0; i < arr1.length; i++) {
    if (!unique.includes(arr1[i])) {
        unique.push(arr1[i]);
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    if (!unique1.includes(arr2[i])) {
      unique1.push(arr2[i]);
    }
  }
  const common = [];
  for (let i = 0; i < unique.length; i++) {
    if (unique1.includes(unique[i])) {
      common.push(unique[i]);
    }
  }

  if (common.length === 0) {
    console.log("false");
  } else {
    console.log(...common);
  }
}
findCommonElement([1, 2, 3], [2, 3, 4]);
findCommonElement([1, 2, 3], [4, 5, 6]);
findCommonElement([1, 2, 2, 3, 4], [2, 3, 4, 5]);

console.log("Bai 3");
// Input:
const arrayWords = ["Hello world", "JS is fun", "Arrays and strings"];
function countTotalWords(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    const words = arr[i].split(" ");
    for (let j = 0; j < words.length; j++) {
      if (words[j] !== "") {
        count++;
      }
    }
  }
  return count;
}

console.log(countTotalWords(arrayWords)); // Output: 8

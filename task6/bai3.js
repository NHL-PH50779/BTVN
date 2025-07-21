// Input:
function filterLongStrings(arr) {
    const arr1=[];
  for(i=0;i<arr.length;i++){
    
    if(arr[i].length>5){
        arr1.push(arr[i]);
    }
  }
  
  console.log(arr1);
}console.log("bài 3");

// Output:
filterLongStrings(["hello", "world", "javascript", "nodejs"]); // Output: ["javascript", "nodejs"]
filterLongStrings(["hi", "hello world", "a b c", "goodbye!!"]); // Output: ["hello world", "goodbye!!"]
filterLongStrings(["hi", "bye", "yes"]); // Output: []
// Input:
function filterEvenNumbers(arr) { 
    const arr1=[];
  for(i=0;i<arr.length;i++){
    if(arr[i]%2==0){
        arr1.push(arr[i]);
    }
   
    
  }
   console.log(arr1);
}console.log("bài 2");

// Output:
filterEvenNumbers([1, 2, 3, 4, 5, 6]); // Output: [2, 4, 6]
filterEvenNumbers([1, 3, 5, 7]); // Output: []
filterEvenNumbers([]); // Output: []
filterEvenNumbers([-2, -1, 0, 1, 2]); // Output: [-2, 0, 2]
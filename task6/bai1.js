function cleanFalsyValues(arr) {
    const arr1 = [];
    for (let i = 0; i < arr.length; i++) {
        if (Boolean(arr[i]) === true) {
            arr1.push(arr[i]);
        }
    }
    
    console.log(arr1); 
   
}console.log("bài 1");
cleanFalsyValues([1, 0, "", null, "hello", undefined, NaN, 2, 3]);

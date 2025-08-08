// Input:
console.log("bai 1");
const arrayString = ["name:John", "age:30", "city:NY"];
function convertArrayToObject(array) {
  return array.reduce((acc, cur) => {
    const [key, value] = cur.split(':');
    acc[key] = value;
    return acc;
  }, {});
}

// Output:
console.log(convertArrayToObject(arrayString));
 // { name: 'John', age: '30', city: 'NY' }
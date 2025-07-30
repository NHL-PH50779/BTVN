console.log("Bai 2");
// Input:
const categories = [
  {
    id: 1,
    name: "Electronics",
    children: [
      {
        id: 2,
        name: "Laptops",
        children: [
          {
            id: 3,
            name: "Apple",
          },
          {
            id: 4,
            name: "Dell",
          },
        ],
      },
      {
        id: 5,
        name: "Headphones",
      },
    ],
  },
  {
    id: 6,
    name: "Books",
    children: [
      {
        id: 7,
        name: "Fiction",
        children: [
          {
            id: 8,
            name: "Thrillers",
          },
          {
            id: 9,
            name: "Mystery",
          },
        ],
      },
      {
        id: 10,
        name: "Non-Fiction",
      },
    ],
  },
];
function flattenCategories(arr, parentId = 0) {
  let result = [];

  for (const category of arr) {
    const { id, name, children } = category;

    result.push({ id, name, parentId });

    if (children && Array.isArray(children)) {
      const childResult = flattenCategories(children, id);
      result = result.concat(childResult);
    }
  }

  return result;
}
const arr = flattenCategories(categories);
console.log(arr);

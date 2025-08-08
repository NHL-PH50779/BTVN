function sortUsersByName(users) {
  //Xử lý và in ra kết quả
  return users.sort(function (a, b) {
    const partsA = a.fullName.split(" ");
    const lastNameA = partsA[partsA.length - 1];
    const firstAndMiddleA = partsA.slice(0, partsA.length - 1).join(" ");
    const partsB = b.fullName.split(" ");
    const lastNameB = partsB[partsB.length - 1];
    const firstAndMiddleB = partsB.slice(0, partsB.length - 1).join(" ");

    if (lastNameA < lastNameB) {
      return -1; 
    }
    if (lastNameA > lastNameB) {
      return 1; 
    }

    if (firstAndMiddleA < firstAndMiddleB) {
      return -1;
    }
    if (firstAndMiddleA > firstAndMiddleB) {
      return 1;
    }

    return 0; 
  });
}

// Input:
const users = [
  { fullName: "Nguyễn Minh Hoàng" },
  { fullName: "Nguyễn Đức Hoàng" },
  { fullName: "Lê Văn" },
  { fullName: "Lê Văn Tình" },
  { fullName: "Lê Nin" },
];
sortUsersByName(users);
console.log(sortUsersByName(users));
// Output:
// [
//   { fullName: "Nguyễn Đức Hoàng" }, // Tên: Hoàng, Họ và tên đệm: Nguyễn Đức
//   { fullName: "Nguyễn Minh Hoàng" }, // Tên: Hoàng, Họ và tên đệm: Nguyễn Minh
//   { fullName: "Lê Nin" }, // Tên: Nin
//   { fullName: "Lê Văn Tình" }, // Tên: Tình
//   { fullName: "Lê Văn" }, // Tên: Văn
// ];
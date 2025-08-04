//Input:
console.log("bai 1");
const orders = [
  { id: 1, amount: 100, date: "2025-04-01", status: "completed" },
  { id: 2, amount: 200, date: "2025-04-02", status: "pending" },
  { id: 3, amount: 150, date: "2025-04-03", status: "completed" },
  { id: 4, amount: 300, date: "2025-04-04", status: "shipped" },
  { id: 5, amount: 50, date: "2025-04-05", status: "cancelled" },
  { id: 6, amount: 120, date: "2025-04-06", status: "completed" },
  { id: 7, amount: 180, date: "2025-04-07", status: "shipped" },
  { id: 8, amount: 220, date: "2025-04-08", status: "pending" },
  { id: 9, amount: 350, date: "2025-04-09", status: "completed" },
  { id: 10, amount: 500, date: "2025-04-10", status: "completed" },
];
function calculateTotalCompletedAmount(array, amount) {
  return array.reduce((total, order) => {
    if (order.status === "completed" && order.amount > amount) {
      return total + order.amount;
    }
    return total;
  }, 0);
}

// Output:
const result = calculateTotalCompletedAmount(orders, 150);
console.log(result); // 850

const result2 = calculateTotalCompletedAmount(orders, 1000);
console.log(result2); // 0
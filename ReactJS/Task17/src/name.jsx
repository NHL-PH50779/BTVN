// src/utils/todoUtils.js

export const getPriorityText = (priority) => {
  if (priority === 1) return "Cao";
  if (priority === 2) return "Trung bình";
  if (priority === 3) return "Thấp";
  return "Không xác định";
};

export const getStatusText = (todo) => {
  if (todo.completed) return "Hoàn thành";

  if (todo.dueDate) {
    const due = new Date(todo.dueDate);
    const now = new Date();
    if (due < now) return "Quá hạn";
  }

  return "Đang thực hiện";
};

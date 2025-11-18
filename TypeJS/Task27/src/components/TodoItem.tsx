import { Todo, toggleTodo, deleteTodo } from "../features/todos/todosSlice";
import { useAppDispatch } from "../hooks";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();

  // Xác định trạng thái hoàn thành (hỗ trợ nhiều tên trường)
  const completed = todo.completed ?? todo.isCompleted ?? false;

  // Tiêu đề linh hoạt
  const title =
    typeof todo.title === "string"
      ? todo.title
      : typeof todo.name === "string"
      ? todo.name
      : "Không có tiêu đề";

  const description = typeof todo.description === "string" ? todo.description : "";
  const priority = (todo.priority as string) ?? "N/A";

  // Format ngày chuẩn Việt Nam
  const formatDate = (date?: string | Date): string => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("vi-VN");
  };

  const dueDate = formatDate(todo.dueDate);
  const createdAt = formatDate(todo.createdAt);
  const updatedAt = formatDate(todo.updatedAt);

  // Màu priority
  const getPriorityColor = (p: string): string => {
    switch (p) {
      case "High": return "#ef4444";
      case "Medium": return "#f59e0b";
      case "Low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const priorityColor = getPriorityColor(priority);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: completed ? "#f9fafb" : "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        opacity: completed ? 0.65 : 1,
        position: "relative" as const,
        cursor: "default",
      }}
    >
      {/* Nút xóa */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteTodo(todo._id));
        }}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          border: "none",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#fecaca";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#fee2e2";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ×
      </button>

      {/* Tiêu đề + priority - click để toggle */}
      <div
        onClick={() => dispatch(toggleTodo(todo))}
        style={{
          cursor: "pointer",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap" as const,
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: completed ? "#6b7280" : "#111827",
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {title}
        </span>

        <span
          style={{
            backgroundColor: priorityColor + "20",
            color: priorityColor,
            fontSize: "11px",
            fontWeight: "bold",
            padding: "4px 10px",
            borderRadius: "999px",
            border: `1px solid ${priorityColor}`,
            textTransform: "uppercase" as const,
            letterSpacing: "0.5px",
          }}
        >
          {priority}
        </span>
      </div>

      {/* Mô tả */}
      {description && (
        <p
          style={{
            margin: "8px 0 12px 0",
            color: "#4b5563",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}

      {/* Ngày tháng */}
      <div style={{ fontSize: "12px", color: "#9ca3af" }}>
        {dueDate && (
          <div style={{ color: "#dc2626", fontWeight: 500, marginBottom: "2px" }}>
            Due: {dueDate}
          </div>
        )}
        {createdAt && <div>Created: {createdAt}</div>}
        {updatedAt && <div>Updated: {updatedAt}</div>}
      </div>
    </div>
  );
}
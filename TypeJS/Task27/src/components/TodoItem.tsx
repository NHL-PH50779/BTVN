import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { addTodo } from "../features/todos/todosSlice";

export default function AddTodo() {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: 1, // 1: Thấp, 2: Trung bình, 3: Cao
    dueDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "priority" ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;

    dispatch(
      addTodo({
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority === 3 ? "High" : form.priority === 2 ? "Medium" : "Low",
        dueDate: form.dueDate || undefined,
      })
    );

    // Reset form
    setForm({
      title: "",
      description: "",
      priority: 1,
      dueDate: "",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && e.currentTarget.tagName !== "TEXTAREA") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        maxWidth: "480px",
        margin: "0 auto 32px",
      }}
    >
      <h2
        style={{
          margin: "0 0 20px 0",
          fontSize: "22px",
          fontWeight: "700",
          color: "#1f2937",
          textAlign: "center" as const,
        }}
      >
        Thêm công việc mới
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Tên công việc (bắt buộc)..."
          style={{
            padding: "12px 16px",
            fontSize: "16px",
            border: "2px solid #e5e7eb",
            borderRadius: "12px",
            outline: "none",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Mô tả chi tiết (tùy chọn)..."
          rows={3}
          style={{
            padding: "12px 16px",
            fontSize: "15px",
            border: "2px solid #e5e7eb",
            borderRadius: "12px",
            outline: "none",
            resize: "vertical" as const,
            fontFamily: "inherit",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
        />

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
          {/* Priority */}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            style={{
              padding: "12px 16px",
              fontSize: "15px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              backgroundColor: "white",
              cursor: "pointer",
              outline: "none",
              flex: "1",
              minWidth: "140px",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          >
            <option value={1}>1 - Thấp</option>
            <option value={2}>2 - Trung bình</option>
            <option value={3}>3 - Cao</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            style={{
              padding: "12px 16px",
              fontSize: "15px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              outline: "none",
              cursor: "pointer",
              flex: "1",
              minWidth: "160px",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
        </div>
        {/* Submit Button */}
        <button
          onClick={handleAdd}
          disabled={!form.title.trim()}
          style={{
            padding: "14px 20px",
            fontSize: "16px",
            fontWeight: "600",
            color: "white",
            backgroundColor: form.title.trim() ? "#3b82f6" : "#9ca3af",
            border: "none",
            borderRadius: "12px",
            cursor: form.title.trim() ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            marginTop: "8px",
          }}
          onMouseEnter={(e) =>
            form.title.trim() && (e.currentTarget.style.backgroundColor = "#2563eb")
          }
          onMouseLeave={(e) =>
            form.title.trim() && (e.currentTarget.style.backgroundColor = "#3b82f6")
          }
        >
          Thêm công việc
        </button>
      </div>
    </div>
  );
}
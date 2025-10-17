
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPriorityText, getStatusText } from "../name";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`https://api-class-o1lo.onrender.com/api/v1/todos/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setTodo(json.data);
        } else {
          setError("Không tìm thấy công việc");
        }
      } catch (error) {
        setError("Đã có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <p style={{ textAlign: "center", color: "#6b7280" }}>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error || !todo) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <p style={{ textAlign: "center", color: "#dc2626" }}>{error || "Không tìm thấy công việc"}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 12,
            background: "#2563eb",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 16 }}>
        Chi tiết công việc
      </h2>
      <div
        style={{
          border: "1px solid #e5e7eb",
          padding: 16,
          borderRadius: 8,
          backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <p style={{ marginBottom: 8 }}>
          <b style={{ color: "#374151" }}>Tên công việc:</b> {todo.name}
        </p>
        <p style={{ marginBottom: 8 }}>
          <b style={{ color: "#374151" }}>Mô tả:</b>{" "}
          {todo.description || <span style={{ fontStyle: "italic", color: "#6b7280" }}>Không có mô tả</span>}
        </p>
        <p style={{ marginBottom: 8 }}>
          <b style={{ color: "#374151" }}>Trạng thái:</b>{" "}
          <span
            style={{
              color:
                getStatusText(todo) === "Hoàn thành"
                  ? "#16a34a"
                  : getStatusText(todo) === "Quá hạn"
                  ? "#dc2626"
                  : "#2563eb",
            }}
          >
            {getStatusText(todo)}
          </span>
        </p>
        <p style={{ marginBottom: 8 }}>
          <b style={{ color: "#374151" }}>Độ ưu tiên:</b> {getPriorityText(todo.priority)}
        </p>
        <p style={{ marginBottom: 8 }}>
          <b style={{ color: "#374151" }}>Hạn chót:</b>{" "}
          {todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString("vi-VN")
            : "Chưa đặt"}
        </p>
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Link
          to={`/todos/${todo._id}/edit`}
          style={{
            background: "#16a34a",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Chỉnh sửa
        </Link>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default TodoDetailPage;
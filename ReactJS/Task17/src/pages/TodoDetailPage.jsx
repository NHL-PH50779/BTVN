import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPriorityText, getStatusText } from "../name";

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }
      fetch(`${API_URL}/${id}`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setTodo(json.data);
          else navigate("/todos");
        })
        .catch(() => navigate("/todos"))
        .finally(() => setLoading(false));
    };
    fetchTodo();
  }, [id, navigate]);

  const handleDelete = () => {
    if (!window.confirm("Bạn có chắc muốn xóa công việc này?")) return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          alert("Xóa công việc thành công");
          navigate("/todos");
        } else {
          alert(json.message || "Đã có lỗi xảy ra");
        }
      })
      .catch(() => alert("Đã có lỗi xảy ra"));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      {loading ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>Đang tải dữ liệu...</p>
      ) : !todo ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>Không tìm thấy công việc</p>
      ) : (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h2 style={{ margin: "0 0 16px", color: "#111827" }}>{todo.name}</h2>
          <p style={{ margin: "0 0 16px", color: "#374151" }}>
            {todo.description || <em>Không có mô tả</em>}
          </p>
          <div style={{ fontSize: 14, color: "#374151" }}>
            <strong>Trạng thái:</strong> {getStatusText(todo)} <br />
            <strong>Ưu tiên:</strong> {getPriorityText(todo.priority)} <br />
            <strong>Hạn:</strong>{" "}
            {todo.dueDate
              ? new Date(todo.dueDate).toLocaleDateString("vi-VN")
              : "Chưa đặt"}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <Link
              to={`/todos/${id}/edit`}
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Cập nhật
            </Link>
            <button
              onClick={handleDelete}
              style={{
                background: "#dc2626",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
            <Link
              to="/todos"
              style={{
                background: "#6b7280",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Quay lại
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetailPage;
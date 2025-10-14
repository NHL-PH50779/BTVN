import React, { useEffect, useState } from "react";

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [priority, setPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const list = Array.isArray(data.data) ? data.data : [];
      setTodos(list);
    } catch (err) {
      console.log("Lỗi khi lấy dữ liệu:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    let temp = [...todos];

    if (q) {
      temp = temp.filter((todo) =>
        todo.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (priority) {
      temp = temp.filter(
        (todo) => String(todo.priority) === String(priority)
      );
    }

    temp.sort((a, b) =>
      sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority
    );

    // Phân trang
    const start = (page - 1) * limit;
    const end = start + limit;
    setFilteredTodos(temp.slice(start, end));
    setTotalPages(Math.ceil(temp.length / limit));
  }, [todos, q, priority, sortOrder, page]);

  const getPriorityLabel = (value) => {
    if (value === 1) return "Cao";
    if (value === 2) return "Trung bình";
    if (value === 3) return "Thấp";
    return "Không rõ";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Danh sách việc cần làm
        </h2>

        <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Tìm công việc..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ flex: 1, padding: "6px" }}
          />
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Tất cả</option>
            <option value="1">Cao</option>
            <option value="2">Trung bình</option>
            <option value="3">Thấp</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div
              key={todo._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              <p>
                {todo.name}
                <br />
                Ưu tiên: {getPriorityLabel(todo.priority)} | Hạn:{" "}
                {new Date(todo.dueDate).toLocaleDateString()}
              </p>
              <p>
                {todo.completed
                  ? " Hoàn thành"
                  : new Date(todo.dueDate) < new Date()
                  ? " Quá hạn"
                  : " Đang thực hiện"}
              </p>
            </div>
          ))
        ) : (
          <p>Không có công việc nào</p>
        )}

        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: "5px 10px" }}
          >
            ⬅ Trước
          </button>
          <span>
            Trang {page}/{totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{ padding: "5px 10px" }}
          >
            Tiếp ➡
          </button>
        </div>
      </div>
    </div>
  );
}

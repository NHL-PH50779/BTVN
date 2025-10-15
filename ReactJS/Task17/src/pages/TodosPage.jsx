import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPriorityText, getStatusText } from "../name";

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [priority, setPriority] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setTodos(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Lỗi khi fetch todos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    let filtered = [...todos];

    if (q.trim() !== "") {
      filtered = filtered.filter((todo) =>
        todo.name?.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (priority) {
      filtered = filtered.filter(
        (todo) => String(todo.priority) === String(priority)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((todo) => {
        const status = getStatusText(todo);
        return status === statusFilter;
      });
    }

    filtered.sort((a, b) => {
      if (sortOrder === "asc") return a.priority - b.priority;
      else return b.priority - a.priority;
    });

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    setFilteredTodos(paginated);
  }, [todos, q, priority, statusFilter, sortOrder, page]);

  const totalPages = Math.ceil(
    todos.filter((todo) => {
      let match = true;
      if (q && !todo.name?.toLowerCase().includes(q.toLowerCase())) match = false;
      if (priority && String(todo.priority) !== String(priority)) match = false;
      if (statusFilter && getStatusText(todo) !== statusFilter) match = false;
      return match;
    }).length / limit
  );

  const resetFilters = () => {
    setQ("");
    setPriority("");
    setStatusFilter("");
    setSortOrder("asc");
    setPage(1);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>📋 Danh sách công việc</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Tìm kiếm..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            padding: 8,
            flex: "1 1 200px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: 8, borderRadius: 6 }}
        >
          <option value="">Mức ưu tiên</option>
          <option value="1">Cao</option>
          <option value="2">Trung bình</option>
          <option value="3">Thấp</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: 8, borderRadius: 6 }}
        >
          <option value="">Trạng thái</option>
          <option value="Đang thực hiện">Đang thực hiện</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Quá hạn">Quá hạn</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: 8, borderRadius: 6 }}
        >
          <option value="asc">Ưu tiên tăng dần</option>
          <option value="desc">Ưu tiên giảm dần</option>
        </select>

        {(q || priority || statusFilter || sortOrder !== "asc") && (
          <button
            onClick={resetFilters}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            🔄 Làm mới
          </button>
        )}
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : filteredTodos.length === 0 ? (
        <p>Không có công việc phù hợp.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: 14,
                backgroundColor: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ margin: "0 0 8px", color: "#111827" }}>
                {todo.name}
              </h3>

              <p style={{ margin: "0 0 8px", color: "#374151" }}>
                {todo.description || <em>Không có mô tả</em>}
              </p>

              <div style={{ fontSize: 13 }}>
                <strong>Trạng thái:</strong> {getStatusText(todo)} <br />
                <strong>Ưu tiên:</strong> {getPriorityText(todo.priority)} <br />
                <strong>Hạn:</strong>{" "}
                {todo.dueDate
                  ? new Date(todo.dueDate).toLocaleDateString("vi-VN")
                  : "Chưa đặt"}
              </div>

              <div style={{ marginTop: 8 }}>
                <Link
                  to={`/todos/${todo._id}`}
                  style={{
                    display: "inline-block",
                    background: "#2563eb",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "6px 10px",
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ⬅ Trước
        </button>
        <span>
          Trang {page}/{totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page >= totalPages}
        >
          Tiếp ➡
        </button>
      </div>
    </div>
  );
};

export default TodosPage;

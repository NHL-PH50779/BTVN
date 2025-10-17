import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPriorityText, getStatusText } from "../name";

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

const TodosPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [priority, setPriority] = useState(searchParams.get("priority") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("statusFilter") || "");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const params = {};
    if (q) params.q = q;
    if (priority) params.priority = priority;
    if (statusFilter) params.statusFilter = statusFilter;
    if (sortOrder) params.sortOrder = sortOrder;
    if (page > 1) params.page = page;
    setSearchParams(params);
  }, [q, priority, statusFilter, sortOrder, page, setSearchParams]);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("_page", page);
        params.append("_limit", limit);
        if (q.trim()) params.append("q", q.trim());
        if (priority) params.append("priority", priority);
        if (statusFilter === "Hoàn thành") {
          params.append("completed", "true");
        } else if (statusFilter === "Đang thực hiện") {
          params.append("completed", "false");
          params.append("dueDate_gte", new Date().toISOString());
        } else if (statusFilter === "Quá hạn") {
          params.append("completed", "false");
          params.append("dueDate_lte", new Date().toISOString());
        }
        params.append("_sort", "priority");
        params.append("_order", sortOrder);

        const res = await fetch(`${API_URL}?${params.toString()}`);
        const json = await res.json();
        setTodos(Array.isArray(json.data) ? json.data : []);
        if (json.meta) {
          setTotalPages(json.meta.totalPages || 1);
          setTotal(json.meta.total || 0);
        }
      } catch (err) {
        console.error("Lỗi khi fetch todos:", err);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [q, priority, statusFilter, sortOrder, page]);

  const resetFilters = () => {
    setQ("");
    setPriority("");
    setStatusFilter("");
    setSortOrder("asc");
    setPage(1);
    setSearchParams({});
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>📋 Danh sách công việc</h2>
      <Link
        to="/todos/create"
        style={{
          display: "inline-block",
          background: "#10b981",
          color: "#fff",
          textDecoration: "none",
          padding: "8px 16px",
          borderRadius: 6,
          marginBottom: 20,
        }}
      >
        Tạo mới công việc
      </Link>

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
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          style={{
            padding: 8,
            flex: "1 1 200px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8, borderRadius: 6 }}
        >
          <option value="">Mức ưu tiên</option>
          <option value="3">Cao</option>
          <option value="2">Trung bình</option>
          <option value="">Thấp</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8, borderRadius: 6 }}
        >
          <option value="">Trạng thái</option>
          <option value="Đang thực hiện">Đang thực hiện</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Quá hạn">Quá hạn</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
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
      ) : todos.length === 0 ? (
        <p>Không có công việc phù hợp.</p>
      ) : (
        <>
          <div style={{ marginBottom: 10, color: "#6b7280", fontSize: 14 }}>
            Tổng: {total} công việc
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {todos.map((todo) => (
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
                    Cập nhật
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
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
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: page === 1 ? "#f3f4f6" : "#fff",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          ⬅ Trước
        </button>
        <span>
          Trang {page}/{totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page >= totalPages}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: page >= totalPages ? "#f3f4f6" : "#fff",
            cursor: page >= totalPages ? "not-allowed" : "pointer",
          }}
        >
          Tiếp ➡
        </button>
      </div>
    </div>
  );
};

export default TodosPage;
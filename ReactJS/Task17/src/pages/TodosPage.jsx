// src/pages/TodosPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPriorityText, getStatusText } from "../name";

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

const TodosPage = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodos = async () => {
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

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
            <h2 style={{ marginBottom: 20 }}>📋 Danh sách công việc</h2>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : todos.length === 0 ? (
                <p>Không có công việc.</p>
            ) : (
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

                            <p style={{ margin: "0 0 8px", color: "#374151", minHeight: 40 }}>
                                {todo.description || <em>Không có mô tả</em>}
                            </p>

                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                                <div style={{ fontSize: 13 }}>
                                    <strong>Trạng thái:</strong>{" "}
                                    <span>{getStatusText(todo)}</span>
                                </div>

                                <div style={{ fontSize: 13 }}>
                                    <strong>Ưu tiên:</strong>{" "}
                                    <span>{getPriorityText(todo.priority)}</span>
                                </div>
                            </div>

                            <Link
                                to={`/todos/${todo._id}`}
                                style={{
                                    textDecoration: "none",
                                    padding: "8px 12px",
                                    background: "#2563eb",
                                    color: "#fff",
                                    borderRadius: 8,
                                    fontSize: 14,
                                }}
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodosPage;

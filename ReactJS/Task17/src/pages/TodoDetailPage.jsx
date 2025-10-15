import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`https://api-class-o1lo.onrender.com/api/v1/todos/${id}`);
        const data = await res.json();
        setTodo(data.data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!todo) return <p>Không tìm thấy công việc.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Chi tiết công việc</h2>
      <div className="border p-4 rounded-md">
        <p><b>Tiêu đề:</b> {todo.title}</p>
        <p><b>Mô tả:</b> {todo.description || "Không có mô tả"}</p>
        <p><b>Trạng thái:</b> {todo.status}</p>
        <p><b>Độ ưu tiên:</b> {todo.priority}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Quay lại
      </button>
    </div>
  );
};

export default TodoDetailPage;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

const FormTodo = ({ mode = "create" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    priority: 1,
    description: "",
    dueDate: "",
    isCompleted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(mode === "update");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode === "update" && id) {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            setFormData({
              name: json.data.name || "",
              priority: json.data.priority || 1,
              description: json.data.description || "",
              dueDate: json.data.dueDate
                ? new Date(json.data.dueDate).toISOString().split("T")[0]
                : "",
              isCompleted: json.data.completed || false,
            });
          } else {
            setError("Không tìm thấy công việc");
          }
        })
        .catch(() => setError("Đã có lỗi xảy ra"))
        .finally(() => setFetchLoading(false));
    }
  }, [mode, id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên không được để trống";
    else if (formData.name.length < 3) newErrors.name = "Tên cần ít nhất 3 ký tự";
    else if (formData.name.length > 80) newErrors.name = "Tên tối đa 80 ký tự";

    if (!formData.dueDate) newErrors.dueDate = "Hạn chót không được để trống";
    else if (isNaN(new Date(formData.dueDate).getTime()))
      newErrors.dueDate = "Hạn chót không hợp lệ";

    if (![1, 2, 3].includes(Number(formData.priority)))
      newErrors.priority = "Mức ưu tiên không hợp lệ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    const bodyData = {
      name: formData.name,
      priority: Number(formData.priority),
      description: formData.description,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      completed: mode === "create" ? false : formData.isCompleted,
    };

    fetch(mode === "create" ? API_URL : `${API_URL}/${id}`, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          alert(mode === "create" ? "Thêm thành công" : "Cập nhật thành công");
          navigate("/todos");
        } else {
          setError(json.message || "Đã có lỗi xảy ra");
        }
      })
      .catch(() => setError("Đã có lỗi xảy ra"))
      .finally(() => setLoading(false));
  };

  if (fetchLoading) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <p style={{ textAlign: "center", color: "#6b7280" }}>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <p style={{ textAlign: "center", color: "#dc2626" }}>{error}</p>
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
        {mode === "create" ? "Tạo mới công việc" : "Cập nhật công việc"}
      </h2>
      {error && <p style={{ color: "#dc2626", marginBottom: 16 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#374151", marginBottom: 4 }}>
            Tên công việc:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
          {errors.name && <p style={{ color: "#dc2626", fontSize: 14, marginTop: 4 }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#374151", marginBottom: 4 }}>
            Mức ưu tiên:
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value={1}>Thấp</option>
            <option value={2}>Trung bình</option>
            <option value={3}>Cao</option>
          </select>
          {errors.priority && <p style={{ color: "#dc2626", fontSize: 14, marginTop: 4 }}>{errors.priority}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#374151", marginBottom: 4 }}>
            Mô tả:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#374151", marginBottom: 4 }}>
            Hạn chót:
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
          {errors.dueDate && <p style={{ color: "#dc2626", fontSize: 14, marginTop: 4 }}>{errors.dueDate}</p>}
        </div>

        {mode === "update" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", color: "#374151" }}>
              <input
                type="checkbox"
                name="isCompleted"
                checked={formData.isCompleted}
                onChange={handleChange}
                style={{ marginRight: 8 }}
              />
              Hoàn thành
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#93c5fd" : "#2563eb",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Đang xử lý..." : mode === "create" ? "Tạo mới" : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};

export default FormTodo;
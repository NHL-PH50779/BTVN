import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://api-class-o1lo.onrender.com/api/v1/todos";

const FormTodo = ({ mode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", description: "", dueDate: "", priority: "", completed: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(mode === "update");
    const [fetchLoading, setFetchLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (mode === "update") {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                navigate("/login");
                return;
            }
            setLoading(true);
            fetch(`${API_URL}/${id}`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.success) {
                        setFormData({
                            name: json.data.name,
                            description: json.data.description || "",
                            dueDate: json.data.dueDate ? new Date(json.data.dueDate).toISOString().split("T")[0] : "",
                            priority: json.data.priority.toString(),
                            completed: json.data.completed,
                        });
                    } else {
                        setError(json.message || "Không tìm thấy công việc");
                    }
                })
                .catch(() => setError("Đã có lỗi xảy ra"))
                .finally(() => setLoading(false));
        }
    }, [id, mode, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Tên công việc không được để trống";
        if (formData.dueDate && new Date(formData.dueDate) < new Date()) newErrors.dueDate = "Ngày hết hạn phải từ hôm nay trở đi";
        if (!formData.priority) newErrors.priority = "Vui lòng chọn mức ưu tiên";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setFetchLoading(true);
        setError("");
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }
        const url = mode === "create" ? API_URL : `${API_URL}/${id}`;
        const method = mode === "create" ? "POST" : "PATCH";
        fetch(url, {
            method,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    alert(mode === "create" ? "Tạo công việc thành công" : "Cập nhật công việc thành công");
                    navigate("/todos");
                } else {
                    setError(json.message || "Đã có lỗi xảy ra");
                }
            })
            .catch(() => setError("Đã có lỗi xảy ra"))
            .finally(() => setFetchLoading(false));
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
            <h2 style={{ marginBottom: 20, color: "#111827" }}>{mode === "create" ? "Tạo công việc mới" : "Cập nhật công việc"}</h2>
            {error && <p style={{ color: "#dc2626", marginBottom: 10, textAlign: "center" }}>{error}</p>}
            {loading ? (
                <p style={{ textAlign: "center", color: "#6b7280" }}>Đang tải dữ liệu...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Tên công việc</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                        />
                        {errors.name && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", minHeight: 100 }}
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Ngày hết hạn</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                        />
                        {errors.dueDate && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.dueDate}</p>}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Mức ưu tiên</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                        >
                            <option value="">Chọn mức ưu tiên</option>
                            <option value="3">Cao</option>
                            <option value="2">Trung bình</option>
                            <option value="1">Thấp</option>
                        </select>
                        {errors.priority && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.priority}</p>}
                    </div>
                    <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={formData.completed}
                            onChange={handleChange}
                            style={{ margin: 0 }}
                        />
                        <label style={{ color: "#374151" }}>Hoàn thành</label>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            type="submit"
                            disabled={fetchLoading}
                            style={{
                                flex: 1,
                                padding: "10px 0",
                                background: fetchLoading ? "#6b7280" : "#2563eb",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                cursor: fetchLoading ? "not-allowed" : "pointer",
                            }}
                        >
                            {mode === "create" ? "Tạo" : "Cập nhật"}
                        </button>
                        <Link
                            to="/todos"
                            style={{
                                flex: 1,
                                textAlign: "center",
                                padding: "10px 0",
                                background: "#6b7280",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                textDecoration: "none",
                            }}
                        >
                            Hủy
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
};

export default FormTodo;
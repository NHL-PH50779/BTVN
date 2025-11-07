import React, { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "../../../api/apiProduct";
import { useNavigate } from "react-router-dom";

// Định nghĩa Icon đơn giản (Giả định có thư viện icon như react-icons)
const PlusIcon = () => <span style={{ marginRight: '5px' }}>➕</span>;
const EditIcon = () => <span style={{ marginRight: '4px' }}>✍️</span>;
const DeleteIcon = () => <span style={{ marginRight: '4px' }}>🗑️</span>;

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "Miễn phí";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- STYLES ---
const styles = {
    container: {
        padding: "40px",
        maxWidth: "1400px",
        margin: "30px auto",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)", // Bóng sâu và hiện đại
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        borderBottom: "3px solid #e0e0e0",
        paddingBottom: "20px",
    },
    title: {
        color: "#1e3a8a", // Màu xanh đậm, sang trọng
        fontSize: "32px",
        fontWeight: "800",
    },
    addButton: (isHovered) => ({
        background: isHovered ? "#3b82f6" : "#2563eb", // Xanh dương tươi mới, có hiệu ứng hover
        color: "#fff",
        padding: "12px 24px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        transition: "all 0.3s ease",
        boxShadow: isHovered ? "0 6px 15px rgba(37, 99, 235, 0.4)" : "0 4px 10px rgba(37, 99, 235, 0.3)",
    }),
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 15px", // Khoảng cách lớn hơn giữa các hàng
    },
    tableHeader: {
        backgroundColor: "#f1f5f9", // Màu nền đầu bảng rất nhẹ
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        overflow: 'hidden', // Quan trọng để bo góc header
    },
    th: {
        textAlign: "left",
        padding: "18px 20px",
        fontWeight: "700",
        color: "#475569", // Xám đậm
        textTransform: "uppercase",
        fontSize: "13px",
        letterSpacing: "0.5px",
    },
    trBase: (isHovered) => ({
        backgroundColor: "#fff",
        boxShadow: isHovered ? "0 8px 15px rgba(0, 0, 0, 0.1)" : "0 4px 8px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)", // Hiệu ứng nhấc lên
        cursor: "pointer",
        borderRadius: "10px",
    }),
    td: {
        padding: "18px 20px",
        border: "none",
        color: "#333",
        fontSize: "15px",
        verticalAlign: "middle",
        // Áp dụng bo góc cho ô đầu/cuối của hàng
        ":first-child": { borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" },
        ":last-child": { borderTopRightRadius: "10px", borderBottomRightRadius: "10px" },
    },
    actionButton: (color) => ({
        padding: "8px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none",
        fontWeight: "600",
        fontSize: "14px",
        transition: "background 0.2s, box-shadow 0.2s",
        marginLeft: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }),
    editButton: (isHovered) => ({
        ...styles.actionButton("#f59e0b"),
        backgroundColor: isHovered ? "#d97706" : "#f59e0b",
        color: "white",
    }),
    deleteButton: (isHovered) => ({
        ...styles.actionButton("#ef4444"),
        backgroundColor: isHovered ? "#b91c1c" : "#ef4444",
        color: "white",
    }),
    loading: {
        textAlign: "center",
        padding: "60px",
        fontSize: "18px",
        color: "#2563eb",
        fontWeight: "500",
        animation: "pulse 1.5s infinite", // Thêm hiệu ứng pulse
    },
    empty: {
        textAlign: "center",
        padding: "50px",
        fontSize: "18px",
        color: "#9ca3af",
        backgroundColor: "#fefefe",
        borderRadius: "10px",
        border: "2px dashed #e5e7eb",
        marginTop: "15px",
        fontStyle: "italic",
    }
};

const ManagementCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredAddButton, setHoveredAddButton] = useState(false);
    const [hoveredEdit, setHoveredEdit] = useState(null);
    const [hoveredDelete, setHoveredDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await getCourses();
            setCourses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Lỗi khi tải danh sách khóa học:", error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Bạn có chắc muốn xóa khóa học này không?");
        if (!ok) return;

        try {
            await deleteCourse(id);
            fetchCourses();
        } catch (error) {
            console.error("Lỗi khi xóa khóa học:", error);
            alert("Xóa thất bại. Kiểm tra console để biết thêm chi tiết.");
        }
    };

    // Style cho từng hàng dựa trên trạng thái hover
    const getRowStyle = (id) => {
        const isHovered = id === hoveredRow;
        return styles.trBase(isHovered);
    }

    return (
        <div style={styles.container}>
            {/* Thêm keyframes cho animation pulse */}
            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.02); opacity: 0.8; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}
            </style>

            <div style={styles.header}>
                <h2 style={styles.title}>⭐ Quản lý Khóa học Chuyên sâu</h2>
                <button
                    onClick={() => navigate("/admin/course")}
                    style={styles.addButton(hoveredAddButton)}
                    onMouseEnter={() => setHoveredAddButton(true)}
                    onMouseLeave={() => setHoveredAddButton(false)}
                >
                    <PlusIcon /> Thêm khóa học mới
                </button>
            </div>

            {loading ? (
                <p style={styles.loading}>Đang tải danh sách khóa học... Vui lòng chờ 🚀</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Tên Khóa học</th>
                            <th style={styles.th}>Giá Bán</th>
                            <th style={styles.th}>Mô tả Tóm tắt</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={styles.empty}>
                                    Chưa có khóa học nào được tạo. Bắt đầu hành trình quản lý của bạn!
                                </td>
                            </tr>
                        ) : (
                            courses.map((c) => (
                                <tr
                                    key={c.id}
                                    style={getRowStyle(c.id)}
                                    onMouseEnter={() => setHoveredRow(c.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    onClick={() => navigate(`/admin/course/${c.id}/lessons`)}
                                >
                                    <td style={styles.td}>{c.id}</td>
                                    <td style={styles.td}>{c.title}</td>
                                    <td style={{...styles.td, fontWeight: '600', color: c.price ? '#059669' : '#1e40af' }}>
                                        {formatCurrency(c.price)}
                                    </td>
                                    <td style={styles.td}>
                                        {c.description?.length > 70 ? c.description.substring(0, 70) + '...' : c.description ?? "-"}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/admin/course/update/${c.id}`);
                                            }}
                                            style={styles.editButton(hoveredEdit === c.id)}
                                            onMouseEnter={() => setHoveredEdit(c.id)}
                                            onMouseLeave={() => setHoveredEdit(null)}
                                        >
                                            <EditIcon /> Sửa
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(c.id);
                                            }}
                                            style={styles.deleteButton(hoveredDelete === c.id)}
                                            onMouseEnter={() => setHoveredDelete(c.id)}
                                            onMouseLeave={() => setHoveredDelete(null)}
                                        >
                                            <DeleteIcon /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManagementCourse;
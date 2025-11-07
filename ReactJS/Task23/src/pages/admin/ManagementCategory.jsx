import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../api/apiCategory";
import { getProducts } from "../../api/apiProduct";
import { useNavigate } from "react-router-dom";

// Định nghĩa Icon đơn giản
const PlusIcon = () => <span style={{ marginRight: '5px' }}>➕</span>;

// --- STYLES ---
const styles = {
    container: {
        padding: "30px",
        maxWidth: "900px",
        margin: "20px auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.08)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        borderBottom: "2px solid #e0e7ff",
        paddingBottom: "15px",
    },
    title: {
        color: "#1d4ed8",
        fontSize: "26px",
        fontWeight: "700",
    },
    addButton: (isHovered) => ({
        background: isHovered ? "#2563eb" : "#1d4ed8", // Xanh dương đậm
        color: "#fff",
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600",
        transition: "all 0.3s ease",
        boxShadow: isHovered ? "0 4px 10px rgba(29, 78, 216, 0.4)" : "none",
    }),
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
    },
    tableHeader: {
        backgroundColor: "#eef2ff", // Màu nền đầu bảng
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        overflow: 'hidden',
    },
    th: {
        textAlign: "left",
        padding: "15px 15px",
        fontWeight: "700",
        color: "#475569",
        textTransform: "uppercase",
        fontSize: "13px",
    },
    trBase: (isHovered) => ({
        backgroundColor: "#fff",
        boxShadow: isHovered ? "0 4px 10px rgba(0, 0, 0, 0.08)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        borderRadius: "8px",
    }),
    td: {
        padding: "15px 15px",
        border: "none",
        color: "#374151",
        fontSize: "14px",
        verticalAlign: "middle",
    },
    categoryTitle: {
        color: "#1d4ed8",
        fontWeight: "600",
        textDecoration: "underline",
        cursor: "pointer",
        transition: 'color 0.2s',
    },
    actionButton: (color, isHovered) => ({
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
        fontWeight: "500",
        fontSize: "13px",
        transition: "all 0.2s",
        backgroundColor: color,
        color: "white",
        opacity: isHovered ? 0.9 : 1,
    }),
    editButton: (isHovered) => ({
        ...styles.actionButton("#f59e0b", isHovered), // Vàng cam
        color: '#333',
        backgroundColor: isHovered ? "#d97706" : "#fcd34d", // Hover chuyển sang màu đậm hơn
        marginRight: "10px" 
    }),
    deleteButton: (isHovered) => ({
        ...styles.actionButton("#ef4444", isHovered), // Đỏ
        backgroundColor: isHovered ? "#b91c1c" : "#ef4444", 
    }),
    empty: {
        textAlign: "center",
        padding: "40px",
        fontSize: "16px",
        color: "#9ca3af",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        border: "1px dashed #e5e7eb",
        marginTop: "10px",
    }
};

const ManagementCategory = () => {
    const [categories, setCategories] = useState([]);
    const [hoveredAddButton, setHoveredAddButton] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredEdit, setHoveredEdit] = useState(null);
    const [hoveredDelete, setHoveredDelete] = useState(null);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Lỗi khi tải danh mục:", error);
            setCategories([]);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            // 🔍 kiểm tra xem danh mục có sản phẩm không
            const products = await getProducts();
            const hasProduct = products.some((p) => p.categoryId === id);

            if (hasProduct) {
                alert("❌ Không thể xoá danh mục vì vẫn còn sản phẩm trong đó!");
                return;
            }

            if (window.confirm("Bạn có chắc muốn xoá danh mục này không?")) {
                await deleteCategory(id);
                alert("✅ Xoá thành công!");
                fetchCategories();
            }
        } catch (err) {
            console.error("Lỗi khi xoá danh mục:", err);
            alert("Lỗi khi xoá danh mục!");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>🏷️ Quản lý Danh mục Sản phẩm</h2>
                <button
                    onClick={() => navigate("/admin/categories/create")}
                    style={styles.addButton(hoveredAddButton)}
                    onMouseEnter={() => setHoveredAddButton(true)}
                    onMouseLeave={() => setHoveredAddButton(false)}
                >
                    <PlusIcon /> Thêm danh mục mới
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={{...styles.th, width: '40%'}}>Tên danh mục</th>
                        <th style={{...styles.th, width: '30%'}}>Slug (URL)</th>
                        <th style={{...styles.th, width: '30%'}}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((c) => (
                            <tr 
                                key={c.id}
                                style={styles.trBase(c.id === hoveredRow)}
                                onMouseEnter={() => setHoveredRow(c.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                <td style={styles.td}>
                                    <span
                                        onClick={() => navigate(`/admin/products?categoryId=${c.id}`)}
                                        style={styles.categoryTitle}
                                    >
                                        {c.title}
                                    </span>
                                </td>
                                <td style={{...styles.td, color: '#4b5563'}}>{c.slug}</td>
                                <td style={styles.td}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/admin/categories/update/${c.id}`);
                                        }}
                                        style={styles.editButton(hoveredEdit === c.id)}
                                        onMouseEnter={() => setHoveredEdit(c.id)}
                                        onMouseLeave={() => setHoveredEdit(null)}
                                    >
                                        ✏️ Sửa
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
                                        🗑️ Xoá
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={styles.empty}>
                                Chưa có danh mục nào được tạo.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementCategory;
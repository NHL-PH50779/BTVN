import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/apiProduct";
import { getCategories } from "../../api/apiCategory";
import { useNavigate } from "react-router-dom";

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- STYLES ---
const styles = {
    container: {
        padding: "30px",
        maxWidth: "1200px",
        margin: "20px auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.08)",
    },
    title: {
        color: "#16a34a", // Xanh lá đậm
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "25px",
    },
    // --- Filter & Action Bar ---
    filterBar: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "30px",
        padding: "15px",
        backgroundColor: "#f0fdf4", // Nền nhẹ cho bộ lọc
        borderRadius: "8px",
        border: "1px solid #dcfce7",
    },
    select: {
        padding: "10px 15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
        minWidth: "180px",
        appearance: 'none', // Ẩn mũi tên mặc định
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5"><path fill="%234B5563" d="M0 0l5 5 5-5z"/></svg>')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        backgroundColor: '#fff',
    },
    input: {
        padding: "10px 15px",
        width: "300px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
        transition: 'border-color 0.3s',
    },
    addButton: (isHovered) => ({
        backgroundColor: isHovered ? "#059669" : "#16a34a", // Xanh lá cây
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600",
        transition: "background-color 0.3s",
        marginLeft: "auto", // Đẩy nút sang phải
    }),
    // --- Table Styles ---
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
    },
    tableHeader: {
        backgroundColor: "#dcfce7", // Màu nền đầu bảng
        borderRadius: "8px",
        overflow: 'hidden',
    },
    th: {
        textAlign: "left",
        padding: "15px 15px",
        fontWeight: "700",
        color: "#065f46",
        textTransform: "uppercase",
        fontSize: "13px",
    },
    trBase: (isHovered) => ({
        backgroundColor: "#fff",
        boxShadow: isHovered ? "0 4px 10px rgba(0, 0, 0, 0.08)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        cursor: 'pointer',
        borderRadius: "8px",
    }),
    td: {
        padding: "15px 15px",
        border: "none",
        color: "#374151",
        fontSize: "14px",
        verticalAlign: "middle",
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
        backgroundColor: isHovered ? "#d97706" : "#fcd34d", 
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

const ManagementProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({ categoryId: "all", q: "" });
    const [hoveredAddButton, setHoveredAddButton] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredEdit, setHoveredEdit] = useState(null);
    const [hoveredDelete, setHoveredDelete] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
             // Đảm bảo chỉ gửi categoryId nếu nó không phải là 'all'
            const apiFilters = {
                q: filters.q
            };
            if (filters.categoryId !== 'all') {
                apiFilters.categoryId = filters.categoryId;
            }
            const data = await getProducts(apiFilters);
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Lỗi khi tải sản phẩm:", error);
            setProducts([]);
        }
       
    };

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

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
            try {
                await deleteProduct(id);
                alert("✅ Xoá thành công!");
                fetchProducts();
            } catch (error) {
                console.error("Lỗi khi xoá sản phẩm:", error);
                alert("Lỗi khi xoá sản phẩm!");
            }
        }
    };

    const getCategoryTitle = (categoryId) => {
        const category = categories.find((cate) => cate.id === Number(categoryId));
        return category ? category.title : "— Không rõ —";
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🛍️ Quản lý Sản phẩm</h2>

            {/* Filter and Action Bar */}
            <div style={styles.filterBar}>
                {/* Select Category */}
                <select
                    value={filters.categoryId}
                    onChange={(e) =>
                        setFilters({ ...filters, categoryId: e.target.value })
                    }
                    style={styles.select}
                >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map((cate) => (
                        <option key={cate.id} value={cate.id}>
                            {cate.title}
                        </option>
                    ))}
                </select>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="🔍 Tìm theo tên sản phẩm..."
                    value={filters.q}
                    onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                    style={styles.input}
                />

                {/* Add Product Button */}
                <button
                    onClick={() => navigate("/admin/products/create")}
                    style={styles.addButton(hoveredAddButton)}
                    onMouseEnter={() => setHoveredAddButton(true)}
                    onMouseLeave={() => setHoveredAddButton(false)}
                >
                    + Thêm sản phẩm mới
                </button>
            </div>

            {/* Products Table */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={{...styles.th, width: '40%'}}>Tên sản phẩm</th>
                        <th style={{...styles.th, width: '20%'}}>Giá</th>
                        <th style={{...styles.th, width: '20%'}}>Danh mục</th>
                        <th style={{...styles.th, width: '20%'}}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((item) => (
                            <tr 
                                key={item.id}
                                style={styles.trBase(item.id === hoveredRow)}
                                onMouseEnter={() => setHoveredRow(item.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                onClick={() => navigate(`/admin/products/update/${item.id}`)} // Click hàng để Sửa nhanh
                            >
                                <td style={{...styles.td, fontWeight: '600'}}>{item.title}</td>
                                <td style={{...styles.td, color: '#b91c1c'}}>{formatCurrency(item.price)}</td>
                                <td style={styles.td}>
                                    {getCategoryTitle(item.categoryId)}
                                </td>
                                <td style={styles.td}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Tránh click lan lên tr
                                            navigate(`/admin/products/update/${item.id}`);
                                        }}
                                        style={styles.editButton(hoveredEdit === item.id)}
                                        onMouseEnter={() => setHoveredEdit(item.id)}
                                        onMouseLeave={() => setHoveredEdit(null)}
                                    >
                                        ✏️ Sửa
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Tránh click lan lên tr
                                            handleDelete(item.id);
                                        }}
                                        style={styles.deleteButton(hoveredDelete === item.id)}
                                        onMouseEnter={() => setHoveredDelete(item.id)}
                                        onMouseLeave={() => setHoveredDelete(null)}
                                    >
                                        🗑️ Xoá
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={styles.empty}>
                                Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementProduct;
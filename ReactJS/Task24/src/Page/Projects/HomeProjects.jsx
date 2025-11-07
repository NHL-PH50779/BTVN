import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import api from "../../Api"; 
import { projectsApi } from "../../Api/ProjectsApi";

// --- ICONS & BADGE ---
const PlusIcon = () => <span style={{ marginRight: '5px' }}>➕</span>;
const TaskIcon = () => <span style={{ marginRight: '4px' }}>📋</span>;
const EditIcon = () => <span style={{ marginRight: '4px' }}>✍️</span>;
const DeleteIcon = () => <span style={{ marginRight: '4px' }}>🗑️</span>;
const ClearIcon = () => <span style={{ marginRight: '4px' }}>🔄</span>;

// Status badge
const getStatusBadge = (status) => {
    let color, text;
    switch (status) {
        case "not-started": color = "#f59e0b"; text = "Chưa Bắt Đầu"; break;
        case "in-progress": color = "#3b82f6"; text = "Đang Tiến Hành"; break;
        case "completed": color = "#10b981"; text = "Hoàn Thành"; break;
        default: color = "#6b7280"; text = "Không Rõ";
    }
    return (
        <span style={{
            backgroundColor: color,
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            display: 'inline-block',
        }}>{text}</span>
    );
};

// --- STYLES (CSS-in-JS) ---
const styles = {
    // Header Login/Logout Bar
    header: {
        backgroundColor: "#f3f4f6",
        borderBottom: "1px solid #e5e7eb",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
    },
    headerTitle: {
        color: "#1d4ed8",
        fontSize: "24px",
        fontWeight: "700",
        margin: 0,
    },
    logoutButton: (isHovered) => ({
        padding: "10px 18px",
        backgroundColor: isHovered ? "#b91c1c" : "#dc2626",
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontWeight: '600',
        textDecoration: 'none',
    }),
    loginLink: (isHovered) => ({
        padding: "10px 18px",
        backgroundColor: isHovered ? "#1d4ed8" : "#2563eb",
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontWeight: '600',
        textDecoration: 'none',
    }),

    // Main Container
    container: {
        padding: "0 40px 40px 40px",
        maxWidth: "1400px",
        margin: "0 auto",
    },
    // Filter Bar
    filterContainer: { 
        display: "flex",
        alignItems: "flex-end",
        gap: "20px",
        marginBottom: "25px",
        padding: "20px",
        backgroundColor: "#f9fafb",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#4b5563',
        marginBottom: '5px'
    },
    select: {
        padding: "10px 15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
        minWidth: "180px",
    },
    input: {
        padding: "10px 15px",
        width: "300px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
    },
    clearButton: (isHovered) => ({
        padding: "10px 15px",
        backgroundColor: isHovered ? "#9ca3af" : "#6b7280",
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontWeight: '600',
    }),
    addButton: (isHovered) => ({
        display: 'inline-block',
        textDecoration: 'none',
        backgroundColor: isHovered ? "#1d4ed8" : "#2563eb",
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '25px',
        transition: 'background-color 0.3s',
        boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)',
    }),
    // Table Styles
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
    },
    tableHeader: {
        backgroundColor: "#eff6ff",
        borderRadius: "8px",
        overflow: 'hidden',
    },
    th: {
        textAlign: "left",
        padding: "15px 15px",
        fontWeight: "700",
        color: "#1e40af",
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
    tdActions: { // Fixed Action Bar spacing
        padding: "15px 15px",
        border: "none",
        verticalAlign: "middle",
        display: 'flex', 
        gap: '12px', // Use gap for spacing
        alignItems: 'center',
    },
    td: {
        padding: "15px 15px",
        border: "none",
        color: "#374151",
        fontSize: "14px",
        verticalAlign: "middle",
    },
    actionButton: (color) => ({
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
        fontWeight: "500",
        fontSize: "13px",
        textDecoration: 'none',
        color: 'white',
        backgroundColor: color,
        transition: "opacity 0.2s, background-color 0.2s",
        whiteSpace: 'nowrap',
    }),
    loadingSpinner: {
        position: 'absolute',
        right: '10px',
        top: '55%', 
        transform: 'translateY(-50%)',
    },
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

const HomeProjects = () => {
    const navigate = useNavigate(); 
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState({ status: "", q: "" });
    const [inputValue, setInputValue] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null); 
    
    // Hover States for buttons
    const [hoveredAdd, setHoveredAdd] = useState(false);
    const [hoveredClear, setHoveredClear] = useState(false);
    const [hoveredLogout, setHoveredLogout] = useState(false);
    const [hoveredLogin, setHoveredLogin] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);

    // Check if logged in (từ localStorage)
    const isLoggedIn = !!localStorage.getItem("token");

    // Handle logout
    const handleLogout = () => {
        if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Đăng xuất thành công!");
            navigate("/auth/login", { replace: true }); 
        }
    };

    // Handle status change (không debounce)
    const handleStatusChange = useCallback((e) => {
        setFilters((prev) => ({ ...prev, status: e.target.value }));
    }, []);

    // Handle search input: Update input ngay (mượt), debounce setFilters
    const handleSearchChange = useCallback(
        (e) => {
            const value = e.target.value;
            setInputValue(value); 

            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }

            const timeout = setTimeout(() => {
                setFilters((prev) => ({ ...prev, q: value })); 
            }, 500);

            setDebounceTimeout(timeout);
        },
        [debounceTimeout]
    );

    // Cleanup timeout khi unmount
    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    // Fetch khi filters thay đổi (status hoặc q)
    useEffect(() => {
        setLoading(true);
        projectsApi(filters)
            .then((data) => {
                setProjects(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi fetch projects:", err);
                toast.error("Lỗi tải danh sách projects!");
                setLoading(false);
            });
    }, [filters.status, filters.q]);

    const clearFilters = useCallback(() => {
        setFilters({ status: "", q: "" });
        setInputValue(""); // Clear input
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
    }, [debounceTimeout]);

    const onDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa project này không?")) {
            try {
                await api.delete(`/projects/${id}`);
                toast.success("Xóa project thành công!");
                setProjects(projects.filter((p) => p.id !== id));
            } catch (error) {
                console.error(error);
                toast.error("Xóa project không thành công!");
            }
        }
    };

    // Show loading indicator only when fetching and projects list is empty initially
    if (loading && projects.length === 0)
        return <div style={styles.empty}>Đang tải danh sách Projects... ⏳</div>;

    return (
        <React.Fragment>
            {/* --- Header với nút Login/Logout --- */}
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>📊 Quản lý Dự án</h1>
                <nav>
                    {isLoggedIn ? (
                        // Nếu đã login: Show nút Logout
                        <button 
                            onClick={handleLogout} 
                            style={styles.logoutButton(hoveredLogout)}
                            onMouseEnter={() => setHoveredLogout(true)}
                            onMouseLeave={() => setHoveredLogout(false)}
                        >
                            Đăng xuất
                        </button>
                    ) : (
                        // Nếu chưa login: Show nút Login
                        <Link 
                            to="/auth/login" 
                            style={styles.loginLink(hoveredLogin)}
                            onMouseEnter={() => setHoveredLogin(true)}
                            onMouseLeave={() => setHoveredLogin(false)}
                        >
                            Đăng nhập
                        </Link>
                    )}
                </nav>
            </header>
            
            <div style={styles.container}>
                {/* --- Filter Bar --- */}
                <div style={styles.filterContainer}>
                    {/* Lọc theo Status */}
                    <div style={styles.filterGroup}>
                        <label style={styles.label}>Lọc theo Trạng thái:</label>
                        <select
                            style={styles.select}
                            value={filters.status}
                            onChange={handleStatusChange}
                        >
                            <option value="">Tất cả Status</option>
                            <option value="not-started">Chưa Bắt Đầu</option>
                            <option value="in-progress">Đang Tiến Hành</option>
                            <option value="completed">Hoàn Thành</option>
                        </select>
                    </div>
                    
                    {/* Tìm kiếm */}
                    <div style={styles.filterGroup}>
                        <label style={styles.label}>Tìm kiếm theo tên:</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                style={styles.input}
                                placeholder="🔍 Nhập keyword... (tìm theo title)"
                                value={inputValue} // Bind với inputValue (cho typing mượt)
                                onChange={handleSearchChange} // Dùng debounce
                            />
                            {/* Spinner chỉ khi đang fetch do search */}
                            {loading && filters.q !== inputValue && (
                                <div style={styles.loadingSpinner}>
                                    <span style={{ fontSize: '18px', color: '#2563eb' }}>⏳</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Nút Huỷ lọc */}
                    <div style={styles.filterGroup}>
                        <button 
                            style={styles.clearButton(hoveredClear)}
                            onMouseEnter={() => setHoveredClear(true)}
                            onMouseLeave={() => setHoveredClear(false)}
                            onClick={clearFilters}
                        >
                            <ClearIcon /> Huỷ Lọc
                        </button>
                    </div>
                </div>

                {/* Nút Thêm Project */}
                {isLoggedIn && ( // 💡 Chỉ cho phép Thêm Project nếu đã đăng nhập
                    <Link 
                        to="add" 
                        style={styles.addButton(hoveredAdd)}
                        onMouseEnter={() => setHoveredAdd(true)}
                        onMouseLeave={() => setHoveredAdd(false)}
                    >
                        <PlusIcon /> Thêm Project mới
                    </Link>
                )}
                
                {/* --- Projects Table --- */}
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>ID</th>
                            <th style={{...styles.th, width: '30%'}}>Tiêu đề</th>
                            <th style={{...styles.th, width: '40%'}}>Mô tả</th>
                            <th style={styles.th}>Trạng thái</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={styles.empty}>
                                    {loading 
                                        ? "Đang tìm kiếm..." 
                                        : inputValue 
                                            ? `Không tìm thấy projects với keyword "${inputValue}"...`
                                            : "Không có projects nào phù hợp với bộ lọc."}
                                </td>
                            </tr>
                        ) : (
                            projects.map((item) => (
                                <tr 
                                    key={item.id}
                                    style={styles.trBase(item.id === hoveredRow)}
                                    onMouseEnter={() => setHoveredRow(item.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <td style={styles.td}>{item.id}</td>
                                    <td style={{...styles.td, fontWeight: '600'}}>{item.title}</td>
                                    <td style={styles.td}>
                                        {item.description?.length > 70 ? item.description.substring(0, 70) + '...' : item.description}
                                    </td>
                                    <td style={styles.td}>{getStatusBadge(item.status)}</td>
                                    
                                    {/* Action buttons (Chỉ hiển thị khi đã đăng nhập) */}
                                    <td style={styles.tdActions}>
                                        <Link to={`tasks/${item.id}`} style={styles.actionButton("#1e40af")}><TaskIcon />Xem Tasks</Link>
                                        
                                        {isLoggedIn && (
                                            <React.Fragment>
                                                <Link to={`edit/${item.id}`} style={styles.actionButton("#f59e0b")}><EditIcon />Sửa</Link>
                                                <button
                                                    onClick={(e) => {e.stopPropagation(); onDelete(item.id);}} 
                                                    style={styles.actionButton("#ef4444")}
                                                >
                                                    <DeleteIcon />Xóa
                                                </button>
                                            </React.Fragment>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default HomeProjects;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLesson, deleteLesson } from "../../../api/apiLesson";

// Định nghĩa Icon đơn giản
const PlusIcon = () => <span style={{ marginRight: '5px' }}>➕</span>;
const EditIcon = () => <span style={{ marginRight: '4px' }}>✍️</span>;
const DeleteIcon = () => <span style={{ marginRight: '4px' }}>🗑️</span>;

// --- STYLES ---
const styles = {
    container: {
        padding: "40px",
        maxWidth: "1000px",
        margin: "30px auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // Bóng hiện đại
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        borderBottom: "2px solid #e0e7ff", // Đường kẻ nhẹ
        paddingBottom: "15px",
    },
    title: {
        color: "#1d4ed8", // Xanh dương đậm
        fontSize: "26px",
        fontWeight: "700",
    },
    addButton: (isHovered) => ({
        background: isHovered ? "#34d399" : "#10b981", // Màu xanh lá cây nổi bật
        color: "#fff",
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600",
        transition: "all 0.3s ease",
        boxShadow: isHovered ? "0 4px 10px rgba(16, 185, 129, 0.4)" : "none",
    }),
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
    },
    tableHeader: {
        backgroundColor: "#f9fafb", // Màu nền đầu bảng
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        overflow: 'hidden',
    },
    th: {
        textAlign: "left",
        padding: "15px 15px",
        fontWeight: "700",
        color: "#4b5563", // Xám đậm
        textTransform: "uppercase",
        fontSize: "13px",
    },
    trBase: (isHovered) => ({
        backgroundColor: "#fff",
        boxShadow: isHovered ? "0 4px 10px rgba(0, 0, 0, 0.08)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        borderRadius: "8px",
        cursor: 'default', // Không click toàn hàng
    }),
    td: {
        padding: "15px 15px",
        border: "none",
        color: "#374151",
        fontSize: "14px",
        verticalAlign: "top",
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

const LessonList = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); // id của khóa học
    const navigate = useNavigate();

    const [hoveredAddButton, setHoveredAddButton] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredEdit, setHoveredEdit] = useState(null);
    const [hoveredDelete, setHoveredDelete] = useState(null);


    useEffect(() => {
        fetchLessons();
    }, [id]);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const data = await getLesson(id);
            setLessons(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log("Lỗi khi tải danh sách bài học:", error);
            setLessons([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (lessonId) => {
        if (window.confirm("Bạn có chắc muốn xóa bài học này không?")) {
            try {
                await deleteLesson(lessonId);
                fetchLessons();
            } catch (error) {
                console.log("Lỗi khi xóa bài học:", error);
                alert("Xóa bài học thất bại.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>📘 Danh sách bài học của khóa **#{id}**</h2>
                <button
                    onClick={() => navigate(`/admin/course/${id}/lessons/create`)}
                    style={styles.addButton(hoveredAddButton)}
                    onMouseEnter={() => setHoveredAddButton(true)}
                    onMouseLeave={() => setHoveredAddButton(false)}
                >
                    <PlusIcon /> Thêm bài học mới
                </button>
            </div>
            
            {loading ? (
                <p style={{ textAlign: 'center', padding: '30px', color: '#10b981' }}>Đang tải bài học...</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={{...styles.th, width: '25%'}}>Tiêu đề</th>
                            <th style={{...styles.th, width: '50%'}}>Nội dung tóm tắt</th>
                            <th style={{...styles.th, width: '25%'}}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.length > 0 ? (
                            lessons.map((lesson) => (
                                <tr 
                                    key={lesson.id}
                                    style={styles.trBase(lesson.id === hoveredRow)}
                                    onMouseEnter={() => setHoveredRow(lesson.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <td style={{...styles.td, fontWeight: '600'}}>{lesson.title}</td>
                                    <td style={styles.td}>
                                        {lesson.content?.length > 100 
                                            ? lesson.content.substring(0, 100) + '...' 
                                            : lesson.content || "Không có nội dung"}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() =>
                                                navigate(`/admin/course/${id}/lessons/edit/${lesson.id}`)
                                            }
                                            style={{ 
                                                ...styles.actionButton("#f59e0b", lesson.id === hoveredEdit), // Màu vàng cam
                                                marginRight: "10px" 
                                            }}
                                            onMouseEnter={() => setHoveredEdit(lesson.id)}
                                            onMouseLeave={() => setHoveredEdit(null)}
                                        >
                                            <EditIcon /> Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(lesson.id)}
                                            style={styles.actionButton("#ef4444", lesson.id === hoveredDelete)} // Màu đỏ
                                            onMouseEnter={() => setHoveredDelete(lesson.id)}
                                            onMouseLeave={() => setHoveredDelete(null)}
                                        >
                                            <DeleteIcon /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={styles.empty}>
                                    Chưa có bài học nào trong khóa học **#{id}**. Bắt đầu thêm bài học đầu tiên!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LessonList;
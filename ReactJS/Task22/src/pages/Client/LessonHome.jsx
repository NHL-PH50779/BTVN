import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLesson } from "../../api/apiLesson";

const styles = {
    container: {
        padding: "40px",
        maxWidth: "1000px",
        margin: "30px auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        borderBottom: "2px solid #e0e7ff",
        paddingBottom: "15px",
    },
    title: {
        color: "#1d4ed8",
        fontSize: "26px",
        fontWeight: "700",
    },
    backButton: (isHovered) => ({
        background: isHovered ? "#2563eb" : "#3b82f6",
        color: "#fff",
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600",
        transition: "all 0.3s ease",
        boxShadow: isHovered ? "0 4px 10px rgba(59,130,246,0.4)" : "none",
    }),
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
    },
    tableHeader: {
        backgroundColor: "#f9fafb",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        overflow: "hidden",
    },
    th: {
        textAlign: "left",
        padding: "15px 15px",
        fontWeight: "700",
        color: "#4b5563",
        textTransform: "uppercase",
        fontSize: "13px",
    },
    trBase: (isHovered) => ({
        backgroundColor: "#fff",
        boxShadow: isHovered
            ? "0 4px 10px rgba(0, 0, 0, 0.08)"
            : "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        borderRadius: "8px",
    }),
    td: {
        padding: "15px 15px",
        border: "none",
        color: "#374151",
        fontSize: "14px",
        verticalAlign: "top",
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
    },
};

const LessonHome = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const [hoveredBackButton, setHoveredBackButton] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);

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

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>📘 Danh sách bài học của khóa #{id}</h2>
                <button
                    onClick={() => navigate("/courses")}
                    style={styles.backButton(hoveredBackButton)}
                    onMouseEnter={() => setHoveredBackButton(true)}
                    onMouseLeave={() => setHoveredBackButton(false)}
                >
                    🏠 Quay lại
                </button>
            </div>

            {loading ? (
                <p
                    style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#10b981",
                    }}
                >
                    Đang tải bài học...
                </p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={{ ...styles.th, width: "30%" }}>Tiêu đề</th>
                            <th style={{ ...styles.th, width: "70%" }}>Nội dung tóm tắt</th>
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
                                    <td
                                        style={{
                                            ...styles.td,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {lesson.title}
                                    </td>
                                    <td style={styles.td}>
                                        {lesson.content?.length > 100
                                            ? lesson.content.substring(0, 100) + "..."
                                            : lesson.content || "Không có nội dung"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={styles.empty}>
                                    Chưa có bài học nào trong khóa học #{id}.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LessonHome;

import React, { useEffect, useState } from 'react'
import { getCourses } from '../../api/apiProduct';
import { useNavigate } from 'react-router-dom'; // Thay Navigate component bằng hook useNavigate

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === 0) return "Miễn phí";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- STYLES ---
const styles = {
    pageContainer: {
        padding: "40px 20px",
        maxWidth: "1400px",
        margin: "0 auto",
        backgroundColor: "#f7f9fc", // Nền nhẹ
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
        color: '#1a202c',
        fontSize: '32px',
        fontWeight: '800',
        borderBottom: '3px solid #e2e8f0',
        paddingBottom: '15px'
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
        gap: '30px',
        justifyContent: 'center',
    },
    card: (isHovered) => ({
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: isHovered ? "0 10px 20px rgba(0, 0, 0, 0.15)" : "0 4px 12px rgba(0, 0, 0, 0.08)",
        transition: 'all 0.3s ease',
        transform: isHovered ? "translateY(-5px)" : "translateY(0)", // Hiệu ứng nhấc lên
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '5px solid #4299e1' // Thanh màu nổi bật
    }),
    title: {
        color: '#1d4ed8', // Xanh đậm
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '10px',
    },
    description: {
        color: '#4a5568',
        fontSize: '14px',
        lineHeight: '1.6',
        marginBottom: '15px',
        flexGrow: 1, // Đẩy giá và nút xuống dưới
    },
    price: (isFree) => ({
        fontSize: '24px',
        fontWeight: '800',
        color: isFree ? '#059669' : '#b91c1c', // Xanh lá nếu miễn phí, Đỏ nếu có giá
        marginBottom: '20px',
    }),
    actionButton: (isHovered) => ({
        background: isHovered ? "#3b82f6" : "#4299e1", // Xanh dương
        color: '#fff',
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'background 0.3s ease',
        boxShadow: isHovered ? "0 4px 10px rgba(66, 153, 225, 0.5)" : "none",
    })
};

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const navigate = useNavigate(); // Sử dụng hook useNavigate

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourses()
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách khóa học:", error);
            }
        };
        fetchCourse();
    }, []);

    const handleNavigate = (id) => {
        // Điều hướng đến trang danh sách bài học, hoặc trang chi tiết khóa học
        navigate(`/courses/${id}/lessons`);
    };
    
    // Nếu đây là trang chủ thực, ta nên điều hướng đến /courses/details/${id}
    // Tuy nhiên, theo logic code cũ, bạn đang điều hướng tới /admin/course/${id}/lessons
    // Tôi sẽ giữ nguyên logic điều hướng đó.

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.header}>🎓 Khám phá Các Khóa học Nổi bật</h1>
            <div style={styles.gridContainer}>
                {products.length === 0 ? (
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#718096'}}>
                        Đang tải khóa học...
                    </div>
                ) : (
                    products.map((item) => (
                        <div
                            key={item.id}
                            style={styles.card(item.id === hoveredCard)}
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <h3 style={styles.title}>{item.title}</h3>
                            <p style={styles.description}>
                                {item.description?.length > 150 
                                    ? item.description.substring(0, 150) + '...' 
                                    : item.description || "Không có mô tả chi tiết."}
                            </p>
                            <h4 style={styles.price(!item.price || item.price === 0)}>
                                {formatCurrency(item.price)}
                            </h4>
                            <button
                                onClick={() => handleNavigate(item.id)}
                                style={styles.actionButton(item.id === hoveredButton)}
                                onMouseEnter={() => setHoveredButton(item.id)}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                Xem Bài học
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default HomePage
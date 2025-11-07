import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginAuth } from '../../api/apiAuth';
import { Link, useNavigate } from 'react-router-dom';

// --- STYLES ---
const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#eef1f6', // Nền màu xám nhạt
    },
    loginCard: {
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Bóng đổ nhẹ, hiện đại
        textAlign: 'center',
    },
    title: {
        color: '#1d4ed8', // Xanh dương đậm
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '30px',
        borderBottom: '2px solid #eff6ff',
        paddingBottom: '10px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        fontSize: '16px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxSizing: 'border-box',
    },
    // Mocking hover/focus state for input
    inputFocus: {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.25)',
        outline: 'none',
    },
    submitButton: (isHovered) => ({
        width: '100%',
        padding: '12px',
        backgroundColor: isHovered ? '#2563eb' : '#3b82f6', // Xanh dương
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
    })
};

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const nav = useNavigate();
    const [hoveredSubmit, setHoveredSubmit] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const onsubmit = async (data) => {
        try {
            const res = await LoginAuth(data);
            
            // Đặt thông báo thành công và chuyển hướng sau khi hoàn tất
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("user", JSON.stringify(res.user));
            
            alert("Đăng nhập thành công.");
            nav("/courses");

        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            alert("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
        }
    };
    
    // Hàm lấy style cho input (mô phỏng focus)
    const getInputStyle = (fieldName) => ({
        ...styles.input,
        ...(focusedInput === fieldName ? styles.inputFocus : {})
    });

    return (
        <div style={styles.pageContainer}>
            <div style={styles.loginCard}>
                <h2 style={styles.title}><Link to="/register">Đăng kí </Link></h2>

                <form onSubmit={handleSubmit(onsubmit)}>
                    {/* Input Email */}
                    <div style={styles.inputGroup}>
                        <input
                        required
                            type="email"
                            placeholder='Địa chỉ Email'
                            {...register("email")}
                            style={getInputStyle('email')}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>

                    {/* Input Password */}
                    <div style={styles.inputGroup}>
                        <input required
                            type="password"
                            placeholder='Mật khẩu'
                            {...register("password")}
                            style={getInputStyle('password')}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={styles.submitButton(hoveredSubmit)}
                        onMouseEnter={() => setHoveredSubmit(true)}
                        onMouseLeave={() => setHoveredSubmit(false)}
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterAuth } from '../../api/apiAuth';
import { useNavigate } from 'react-router-dom';

// --- STYLES ---
const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#eef1f6', // Nền màu xám nhạt
    },
    registerCard: {
        width: '100%',
        maxWidth: '450px', // Rộng hơn một chút so với Login
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        color: '#059669', // Xanh lá cây tươi mới cho Đăng ký
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '30px',
        borderBottom: '2px solid #d1fae5',
        paddingBottom: '10px',
    },
    inputGroup: {
        marginBottom: '20px',
        textAlign: 'left',
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
    inputFocus: {
        borderColor: '#10b981', // Màu xanh lá khi focus
        boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.25)',
        outline: 'none',
    },
    submitButton: (isHovered) => ({
        width: '100%',
        padding: '12px',
        backgroundColor: isHovered ? '#059669' : '#10b981', // Xanh lá
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        marginTop: '10px',
    }),
    loginPrompt: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#4b5563',
    },
    loginLink: {
        color: '#1d4ed8',
        fontWeight: '600',
        textDecoration: 'none',
        cursor: 'pointer',
        marginLeft: '5px',
    }
};

const RegisterPage = () => {
    const { register, handleSubmit } = useForm();
    const nav = useNavigate();
    const [hoveredSubmit, setHoveredSubmit] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const onsubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp!");
            return;
        }

        try {
            const newData = {
                email: data.email,
                fullname: data.fullname,
                password: data.password,
                role: "client",
            };

            await RegisterAuth(newData);
            
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            nav("/login");

        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            // Có thể dùng thông báo lỗi chi tiết hơn nếu API trả về mã lỗi cụ thể
            alert("Đăng ký thất bại. Email có thể đã tồn tại hoặc lỗi máy chủ.");
        }
    };
    
    const getInputStyle = (fieldName) => ({
        ...styles.input,
        ...(focusedInput === fieldName ? styles.inputFocus : {})
    });

    return (
        <div style={styles.pageContainer}>
            <div style={styles.registerCard}>
                <h2 style={styles.title}>✍️ Đăng ký Tài khoản Mới</h2>

                <form onSubmit={handleSubmit(onsubmit)}>
                    {/* Input Fullname */}
                    <div style={styles.inputGroup}>
                        <input 
                            type="text" 
                            placeholder='Họ và tên'
                            {...register("fullname", { required: true })} 
                            style={getInputStyle('fullname')}
                            onFocus={() => setFocusedInput('fullname')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>
                    
                    {/* Input Email */}
                    <div style={styles.inputGroup}>
                        <input 
                            type="email" 
                            placeholder='Địa chỉ Email'
                            {...register("email", { required: true })} 
                            style={getInputStyle('email')}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>
                    
                    {/* Input Password */}
                    <div style={styles.inputGroup}>
                        <input 
                            type="password" 
                            placeholder='Mật khẩu (ít nhất 6 ký tự)'
                            {...register("password", { required: true, minLength: 6 })} 
                            style={getInputStyle('password')}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>
                    
                    {/* Input Confirm Password */}
                    <div style={styles.inputGroup}>
                        <input 
                            type="password" 
                            placeholder='Xác nhận Mật khẩu'
                            {...register("confirmPassword", { required: true })} 
                            style={getInputStyle('confirmPassword')}
                            onFocus={() => setFocusedInput('confirmPassword')}
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
                        Đăng ký ngay
                    </button>
                </form>

                <p style={styles.loginPrompt}>
                    Đã có tài khoản?
                    <span style={styles.loginLink} onClick={() => nav("/login")}>
                        Đăng nhập
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
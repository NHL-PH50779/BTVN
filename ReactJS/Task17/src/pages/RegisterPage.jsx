import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  userName: z.string().nonempty("Tên người dùng không được để trống").min(3, "Tên phải từ 3 đến 30 ký tự").max(30, "Tên phải từ 3 đến 30 ký tự"),
  email: z.string().nonempty("Email không được để trống").email("Email không hợp lệ"),
  password: z.string().nonempty("Mật khẩu không được để trống").min(7, "Mật khẩu phải từ 7 đến 20 ký tự").max(20, "Mật khẩu phải từ 7 đến 20 ký tự"),
  confirmPassword: z.string().nonempty("Xác nhận mật khẩu không được để trống"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
  message: "Bạn phải đồng ý với điều khoản",
}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { userName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://api-class-o1lo.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: data.userName, email: data.email, password: data.password }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Đăng ký thành công");
        navigate("/login");
      } else {
        setApiError(json.message || "Đăng ký thất bại");
      }
    } catch {
      setApiError("Đã có lỗi xảy ra");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #e5e7eb", borderRadius: 10, backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <h2 style={{ marginBottom: 20, textAlign: "center", color: "#111827" }}>Đăng ký</h2>
      {apiError && <p style={{ color: "#dc2626", marginBottom: 10, textAlign: "center" }}>{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Tên người dùng</label>
          <input
            type="text"
            {...register("userName")}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          />
          {errors.userName && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.userName.message}</p>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Email</label>
          <input
            type="email"
            {...register("email")}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          />
          {errors.email && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.email.message}</p>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Mật khẩu</label>
          <input
            type="password"
            {...register("password")}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          />
          {errors.password && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.password.message}</p>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, color: "#374151" }}>Xác nhận mật khẩu</label>
          <input
            type="password"
            {...register("confirmPassword")}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          />
          {errors.confirmPassword && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 4 }}>{errors.confirmPassword.message}</p>}
        </div>
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" {...register("agreeToTerms")} style={{ margin: 0 }} />
          <label style={{ color: "#374151" }}>Đồng ý với điều khoản</label>
        </div>
        {errors.agreeToTerms && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 16 }}>{errors.agreeToTerms.message}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "10px 0",
            background: isSubmitting ? "#6b7280" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          Đăng ký
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: "center", color: "#374151" }}>
        Đã có tài khoản? <Link to="/login" style={{ color: "#2563eb", textDecoration: "none" }}>Đăng nhập</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().nonempty("Email không được để trống").email("Email không hợp lệ"),
  password: z.string().nonempty("Mật khẩu không được để trống").min(7, "Mật khẩu phải từ 7 đến 20 ký tự").max(20, "Mật khẩu phải từ 7 đến 20 ký tự"),
  remember: z.boolean(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://api-class-o1lo.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Đăng nhập thành công");
        localStorage.setItem("accessToken", json.data.accessToken);
        navigate("/todos");
      } else {
        setApiError(json.message || "Đăng nhập thất bại");
      }
    } catch {
      setApiError("Đã có lỗi xảy ra");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #e5e7eb", borderRadius: 10, backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <h2 style={{ marginBottom: 20, textAlign: "center", color: "#111827" }}>Đăng nhập</h2>
      {apiError && <p style={{ color: "#dc2626", marginBottom: 10, textAlign: "center" }}>{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Đăng nhập
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: "center", color: "#374151" }}>
        Chưa có tài khoản? <Link to="/register" style={{ color: "#2563eb", textDecoration: "none" }}>Đăng ký</Link>
      </p>
    </div>
  );
};

export default LoginPage;

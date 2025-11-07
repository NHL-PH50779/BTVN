import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { RegisterApi } from "../Api/AuthApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();

  // ✅ Schema kiểm tra confirm password
  const Schema = z
    .object({
      email: z.string().email({ message: "Email phải đúng định dạng" }),
      password: z
        .string()
        .min(6, { message: "Mật khẩu ít nhất 6 ký tự" })
        .max(20, { message: "Mật khẩu tối đa 20 ký tự" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Schema) });

  const onSubmit = async (data) => {
    try {
      await RegisterApi({
        email: data.email,
        password: data.password,
      });
      toast.success("Đăng ký thành công!");
      nav("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thất bại!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Đăng ký tài khoản</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword.message}</div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
            Đăng ký
          </button>

          {/* Optional: link đến đăng nhập */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Đã có tài khoản?{" "}
              <a
                href="/auth/login"
                className="text-decoration-none text-primary fw-semibold"
              >
                Đăng nhập
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

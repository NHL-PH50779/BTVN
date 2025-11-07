import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCourse, updateCourse, getCourseDetail } from "../../../api/apiProduct";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const courseSchema = z.object({
  title: z.string().min(6, "Title phải ít nhất 6 ký tự").nonempty("Title không được để trống"),
  price: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() !== "") {
        const n = Number(val);
        return isNaN(n) ? val : n;
      }
      return val;
    },
    z.number({ invalid_type_error: "Price phải là số" }).positive("Price phải là số dương")
  ),
  description: z.string().optional().or(z.literal("")).transform((v) => v || ""),
});

const CreateCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getCourseDetail(id);
          reset({
            title: data.title ?? "",
            price: data.price ?? 0,
            description: data.description ?? "",
          });
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết khóa học:", error);
          alert("Không lấy được dữ liệu khóa học.");
        }
      })();
    } else {
      reset({ title: "", price: 0, description: "" });
    }
  }, [id, reset]);

  const onSubmit = async (values) => {
    try {
      if (id) {
        await updateCourse(id, values);
        alert("Cập nhật khóa học thành công!");
      } else {
        await createCourse(values);
        alert("Thêm khóa học thành công!");
      }
      navigate("/admin/courses");
    } catch (error) {
      console.error("Lỗi khi lưu khóa học:", error);
      alert("Lưu thất bại. Kiểm tra console để biết chi tiết.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: 30,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: 20,
          textAlign: "center",
          color: "#333",
          fontWeight: "600",
        }}
      >
        {id ? "✏️ Chỉnh sửa khóa học" : "📘 Thêm khóa học mới"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Tên khóa học (tối thiểu 6 ký tự)"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: 6,
              outline: "none",
            }}
          />
          {errors.title && <p style={{ color: "red", fontSize: 14 }}>{errors.title.message}</p>}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            placeholder="Giá (số dương)"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: 6,
              outline: "none",
            }}
          />
          {errors.price && <p style={{ color: "red", fontSize: 14 }}>{errors.price.message}</p>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Description</label>
          <textarea
            {...register("description")}
            placeholder="Mô tả khóa học (không bắt buộc)"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: 6,
              minHeight: 100,
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {id ? "Cập nhật" : "Thêm mới"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              padding: "10px 20px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, updateCategory, getCategoryDetail } from "../../api/apiCategory";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  title: z.string().min(3, "Tên danh mục phải có ít nhất 3 ký tự").nonempty("Không được để trống"),
  slug: z
    .string()
    .nonempty("Slug không được để trống")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"),
});

const CreateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { title: "", slug: "" },
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getCategoryDetail(id);
        reset({ title: data.title ?? "", slug: data.slug ?? "" });
      })();
    } else {
      reset({ title: "", slug: "" });
    }
  }, [id, reset]);

  const onSubmit = async (values) => {
    try {
      if (id) {
        await updateCategory(id, values);
        alert("Cập nhật danh mục thành công!");
      } else {
        await createCategory(values);
        alert("Thêm danh mục thành công!");
      }
      navigate("/admin/categories");
    } catch (error) {
      console.error("Lỗi khi lưu danh mục:", error);
      alert("Lưu thất bại!");
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
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        {id ? "✏️ Cập nhật danh mục" : "📂 Thêm danh mục mới"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: 15 }}>
          <label>Tên danh mục</label>
          <input
            {...register("title")}
            placeholder="Nhập tên danh mục"
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Slug</label>
          <input
            {...register("slug")}
            placeholder="slug-khong-co-khoang-trang"
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
          {errors.slug && <p style={{ color: "red" }}>{errors.slug.message}</p>}
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
            }}
          >
            {id ? "Cập nhật" : "Thêm mới"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              padding: "10px 20px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;

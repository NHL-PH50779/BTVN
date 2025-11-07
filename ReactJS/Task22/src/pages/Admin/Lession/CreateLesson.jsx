import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLesson,
  updateLesson,
  getLessonDetail,
} from "../../../api/apiLesson";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Validation bằng Zod
const lessonSchema = z.object({
  title: z
    .string()
    .min(6, "Title phải ít nhất 6 ký tự")
    .nonempty("Title không được để trống"),
  content: z.string().optional(),
});

const CreateLesson = () => {
  const navigate = useNavigate();
  const { id, lessonId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (lessonId) {
      (async () => {
        try {
          const data = await getLessonDetail(lessonId);
          reset({
            title: data.title ?? "",
            content: data.content ?? "",
          });
        } catch (error) {
          console.log("Lỗi khi lấy dữ liệu bài học:", error);
        }
      })();
    } else {
      reset({ title: "", content: "" });
    }
  }, [lessonId, reset]);

  const onSubmit = async (values) => {
    try {
      if (lessonId) {
        await updateLesson(lessonId, { ...values, courseId: id });
        alert("Cập nhật bài học thành công!");
      } else {
        await createLesson({ ...values, courseId: id });
        alert("Thêm bài học thành công!");
      }
      navigate(`/admin/course/${id}/lessons`);
    } catch (error) {
      console.log("Lỗi khi lưu bài học:", error);
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
        {lessonId ? "✏️ Chỉnh sửa bài học" : "📝 Thêm bài học mới"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontWeight: "500",
              marginBottom: 6,
              color: "#444",
            }}
          >
            Tiêu đề bài học <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Nhập tiêu đề (tối thiểu 6 ký tự)"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          {errors.title && (
            <p style={{ color: "red", marginTop: 6 }}>{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontWeight: "500",
              marginBottom: 6,
              color: "#444",
            }}
          >
            Nội dung (không bắt buộc)
          </label>
          <textarea
            {...register("content")}
            placeholder="Nhập nội dung bài học..."
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              outline: "none",
              minHeight: 100,
              resize: "vertical",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 20,
          }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "500",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#0056b3")}
            onMouseOut={(e) => (e.target.style.background = "#007bff")}
          >
            {lessonId ? "💾 Cập nhật" : "➕ Thêm mới"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/admin/course/${id}/lessons`)}
            style={{
              background: "#6c757d",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "500",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#5a6268")}
            onMouseOut={(e) => (e.target.style.background = "#6c757d")}
          >
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLesson;

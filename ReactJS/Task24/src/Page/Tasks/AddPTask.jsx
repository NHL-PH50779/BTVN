import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom"; // Thêm useSearchParams để prefill projectId
import { toast } from "react-toastify";
import { useState } from "react"; // Thêm loading state
import z from "zod";
import api from "../../Api"; // Giả sử api là Axios instance cho POST /tasks

const AddPTask = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Lấy query params (e.g., ?projectId=1 từ HomeTask)
  const defaultProjectId = searchParams.get("projectId") || ""; // Prefill nếu có
  const [loading, setLoading] = useState(false); // Loading để disable submit

  // Fix schema: Tách projectId ra top-level, fix message
  const Schema = z.object({
    title: z
      .string({ message: "Title không được bỏ trống" })
      .min(3, { message: "Title tối thiểu 3 ký tự" }),
    description: z.string({ message: "Description không được bỏ trống" }),
    status: z.enum(["not-started", "in-progress", "completed"], {
      errorMap: () => ({
        message:
          "Status không được bỏ trống và phải là một trong: not-started, in-progress, completed",
      }),
    }),
    projectId: z.coerce // Coerce string từ select → number
      .number()
      .min(1, { message: "ProjectId phải lớn hơn 0" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: { projectId: defaultProjectId },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/tasks", data);
      toast.success("Thêm task mới thành công!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Lỗi thêm task:", error.response?.data || error.message);
      toast.error(
        `Thêm mới thất bại: ${
          error.response?.data?.message || "Lỗi không xác định"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Thêm Task Mới</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="projectId" className="form-label">
            Project ID
          </label>
          <select
            id="projectId"
            className={`form-select ${errors.projectId ? "is-invalid" : ""}`}
            aria-label="Chọn Project ID"
            {...register("projectId", { valueAsNumber: true })}
            disabled={loading}
          >
            <option value="">Chọn Project ID...</option>
            <option value="1">Project 1</option>
            <option value="2">Project 2</option>
            <option value="3">Project 3</option>
          </select>
          {errors.projectId && (
            <div className="invalid-feedback">{errors.projectId.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title")}
            disabled={loading}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="3"
            {...register("description")}
            disabled={loading}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className={`form-select ${errors.status ? "is-invalid" : ""}`}
            aria-label="Chọn Status"
            {...register("status")}
            disabled={loading}
          >
            <option value="">Chọn Status...</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <div className="invalid-feedback">{errors.status.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Đang thêm..." : "Submit"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default AddPTask;

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { tasksApi, UpdatetasksApi } from "../../Api/TaskApi";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

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
    projectId: z.coerce
      .number()
      .min(1, { message: "ProjectId phải lớn hơn 0" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  useEffect(() => {
    if (id) {
      setFetchLoading(true);
      tasksApi(id)
        .then((taskData) => {
          setValue("title", taskData.title);
          setValue("description", taskData.description);
          setValue("status", taskData.status);
          setValue("projectId", taskData.projectId);
          setFetchLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi fetch task:", err);
          toast.error("Lỗi tải thông tin task!");
          setFetchLoading(false);
          navigate("/");
        });
    }
  }, [id, setValue, navigate]);

  const onSubmit = async (data) => {
    if (!id) {
      toast.error("Không tìm thấy ID task!");
      return;
    }
    setLoading(true);
    try {
      await UpdatetasksApi(id, data);
      toast.success("Cập nhật task thành công!");
      reset();
      navigate(`/tasks/${data.projectId || ""}`);
    } catch (error) {
      console.error(
        "Lỗi cập nhật task:",
        error.response?.data || error.message
      );
      toast.error(
        `Cập nhật thất bại: ${
          error.response?.data?.message || "Lỗi không xác định"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="text-center p-4">Đang tải thông tin task...</div>;
  }

  return (
    <div>
      <h1>Chỉnh sửa Task</h1>

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
          {loading ? "Đang cập nhật..." : "Cập nhật"}
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

export default EditTask;

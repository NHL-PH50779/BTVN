import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { AddprojectsApi } from "../../Api/ProjectsApi";
import { useNavigate } from "react-router-dom";

const AddProjects = () => {
  const nav = useNavigate();
  const Scherma = z.object({
    title: z
      .string({ message: "title không được bỏ trống" })
      .min(3, { message: "title tối thiểu 3 ký tự" }),
    description: z.string({ message: "description không đuọc bỏ trống" }),
    status: z.enum(["not-started", "in-progress", "completed"], {
      message:
        "message: status không được bỏ trống và phải là một trong: not-started, in-progress, completed",
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Scherma) });

  const onSubmit = async (data) => {
    try {
      await AddprojectsApi(data);
      toast.success("Thêm mới thành công");
      nav(`/`);
    } catch (error) {
      console.log(error);
      toast.error("Thêm mới thất bại");
    }
  };
  return (
    <div>
      <h1>AddProjects</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`} // Thêm class Bootstrap cho lỗi
            {...register("title")}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            id="description"
            type="text"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            {...register("description")}
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
            aria-label="Default select example"
            {...register("status")}
          >
            <option value="">Chọn status...</option>{" "}
            {/* Option mặc định rỗng */}
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <div className="invalid-feedback">{errors.status.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProjects;

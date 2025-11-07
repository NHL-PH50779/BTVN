import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { projectApi, UpdateprojectsApi } from "../../Api/ProjectsApi";

const EditProjects = () => {
  const { id } = useParams();
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
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Scherma) });

  const onSubmit = async (data) => {
    try {
      await UpdateprojectsApi(id, data);
      toast.success("Sửa mới thành công");
      nav(`/`);
    } catch (error) {
      console.log(error);
      toast.error("Sửa mới thất bại");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await projectApi(id);
        reset(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id, reset]);
  return (
    <div>
      <h1>EditProjects</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
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

export default EditProjects;

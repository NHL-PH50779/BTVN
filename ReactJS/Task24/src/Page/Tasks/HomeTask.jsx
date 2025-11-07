import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Api";

const HomeTask = () => {
  const { projectId } = useParams(); // Lấy projectId từ URL (/tasks/1)
  const [tasks, setTasks] = useState([]); // Chỉ tasks trùng projectId
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      axios
        .get(`http://localhost:3000/tasks?projectId=${projectId}`) // Backend filter: chỉ tasks có projectId=projectId
        .then((res) => {
          setTasks(res.data); // Đã filtered
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi fetch tasks:", err);
          toast.error("Lỗi tải tasks!");
          setLoading(false);
        });
    }
  }, [projectId]);

  const onDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa task này không?")) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success("Xóa task thành công!");
        setTasks(tasks.filter((t) => t.id !== id));
      } catch (error) {
        console.error(error);
        toast.error("Xóa task không thành công!");
      }
    }
  };

  if (loading)
    return (
      <div className="text-center p-4">
        Đang tải tasks của project {projectId}...
      </div>
    );

  return (
    <div>
      <h1>Tasks của Project ID: {projectId}</h1>
      <div className="mb-3">
        <Link to="/tasks/add" className="btn btn-primary me-2">
          Thêm Task mới
        </Link>
        <Link to="../.." className="btn btn-secondary">
          Quay về Danh sách Projects
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Project ID (liên kết)</th>{" "}
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-warning">
                Không có tasks nào cho project ID {projectId} (không trùng
                projectId).
              </td>
            </tr>
          ) : (
            tasks.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>{item.projectId} </td>
                <td>
                  <Link
                    to={`/tasks/edit/${item.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Debug: Uncomment nếu cần check allTasks */}
      {/* <pre>{JSON.stringify(allTasks.slice(0, 5), null, 2)}</pre> */}
    </div>
  );
};

export default HomeTask;

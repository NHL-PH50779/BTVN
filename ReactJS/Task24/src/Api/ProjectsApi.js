import api from "."; // Axios instance

// Update: projectsApi hỗ trợ filter (status, q)
export const projectsApi = async (filters = {}) => {
  const { status = "", q = "" } = filters; // Default empty để huỷ lọc (trả all)
  let url = "/projects";

  // Build query params nếu có filter
  const params = new URLSearchParams();
  if (status && status !== "all") {
    // 'all' hoặc empty → không filter status
    params.append("status", status);
  }
  if (q) {
    params.append("q", q);
  }
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const { data } = await api.get(url);
  return data;
};

// Giữ nguyên các API khác
export const AddprojectsApi = async (useData) => {
  const { data } = await api.post("/projects", useData);
  return data;
};

export const UpdateprojectsApi = async (id, useData) => {
  const { data } = await api.put(`/projects/${id}`, useData);
  return data;
};

export const projectApi = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

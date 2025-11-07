import api from ".";

export const TaskApis = async () => {
  const { data } = await api.get("/tasks");
  return data;
};
export const AddtasksApi = async (useData) => {
  const { data } = await api.post("/tasks", useData);
  return data;
};
export const UpdatetasksApi = async (id, useData) => {
  const { data } = await api.put(`/tasks/${id}`, useData);
  return data;
};

export const tasksApi = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

import axios from "axios";

const BASE_URL = "http://localhost:3000/categories";

// Lấy danh sách danh mục
export const getCategories = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// Lấy chi tiết danh mục
export const getCategoryDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết danh mục:", error);
  }
};

// Thêm mới danh mục
export const createCategory = async (data) => {
  try {
    const res = await axios.post(BASE_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error);
  }
};

// Cập nhật danh mục
export const updateCategory = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
  }
};

// Xóa danh mục
export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
  }
};


export const checkCategoryHasProducts = async (id) => {
  const res = await api.get(`/categories/${id}/has-products`);
  return res.data;
};

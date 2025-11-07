import axios from "axios";

const BASE_URL = "http://localhost:3000/products";

// Lấy danh sách sản phẩm
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.categoryId && filters.categoryId !== "all") {
    params.append("categoryId", filters.categoryId);
  }

  if (filters.q && filters.q.trim() !== "") {
    params.append("q", filters.q.trim());
  }

  const res = await axios.get(`${BASE_URL}?${params.toString()}`);
  return res.data;
};

// Lấy chi tiết sản phẩm
export const getProductDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
  }
};

// Thêm mới sản phẩm
export const createProduct = async (data) => {
  try {
    const res = await axios.post(BASE_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
  }
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};

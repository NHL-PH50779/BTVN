import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/apiProduct";
import { getCategories } from "../../api/apiCategory";
import { useNavigate } from "react-router-dom";

// Định dạng tiền tệ
const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || amount === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ categoryId: "all", q: "" });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  // Lấy sản phẩm
  const fetchProducts = async () => {
    const data = await getProducts(filters);
    setProducts(data);
  };

  // Lấy danh mục
  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1a202c",
          fontSize: "32px",
          fontWeight: "800",
        }}
      >
        🛍️ Khám phá các sản phẩm nổi bật
      </h1>

      {/* --- Bộ lọc --- */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <select
          value={filters.categoryId}
          onChange={(e) =>
            setFilters({ ...filters, categoryId: e.target.value })
          }
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((cate) => (
            <option key={cate.id} value={cate.id}>
              {cate.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          style={{
            padding: "8px 12px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

 
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {products.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "50px",
              color: "#718096",
            }}
          >
            Không có sản phẩm nào phù hợp.
          </div>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow:
                  hoveredCard === item.id
                    ? "0 10px 20px rgba(0,0,0,0.15)"
                    : "0 4px 10px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                transform:
                  hoveredCard === item.id ? "translateY(-5px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />
              <h3
                style={{
                  color: "#1d4ed8",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "#4a5568",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                {item.description?.length > 100
                  ? item.description.substring(0, 100) + "..."
                  : item.description}
              </p>
              <p
                style={{
                  fontWeight: "700",
                  color:
                    !item.price || item.price === 0 ? "#059669" : "#b91c1c",
                  fontSize: "18px",
                  marginBottom: "15px",
                }}
              >
                {formatCurrency(item.price)}
              </p>
              <button
                onClick={() => handleNavigate(item.id)}
                style={{
                  background:
                    hoveredButton === item.id ? "#3b82f6" : "#4299e1",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  width: "100%",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  fontWeight: "600",
                }}
                onMouseEnter={() => setHoveredButton(item.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Xem chi tiết
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;

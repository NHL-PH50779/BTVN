import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "../Ts/products";
import { useCart } from "../context/CartContext";

const url = "https://dummyjson.com/products";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(url);
                setProducts(data.products);
            } catch (error) {
                console.error("Error :", error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    return (
        <div className="container py-5">
            <h1 className="mb-5 fw-light text-center" style={{ color: "#333", letterSpacing: '2px' }}>
                <span className="fw-bolder text-uppercase border-bottom border-3 border-dark pb-2">DISCOVER OUR COLLECTION</span>
            </h1>

            {products.length === 0 ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted fw-semibold">Loading your curated selection...</p>
                </div>
            ) : (
                <div className="row g-5">
                    {products.map((item) => (
                        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div
                                className="card h-100 border-0 overflow-hidden rounded-4"
                                style={{
                                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                                    transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s",
                                    cursor: "pointer",
                                    backgroundColor: '#fff'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-10px)";
                                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.08)";
                                }}
                            >
                                <div className="p-2" style={{ backgroundColor: '#f8f8f8' }}>
                                    <img
                                        src={item.thumbnail}
                                        className="card-img-top rounded-3"
                                        alt={item.title}
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />
                                </div>

                                <div className="card-body d-flex flex-column p-4">
                                    {/* Category Tag */}
                                    <span
                                        className="badge text-bg-secondary mb-2 align-self-start text-capitalize px-3 py-1 fw-normal"
                                        style={{ fontSize: '0.75rem', backgroundColor: '#e0e0e0', color: '#555' }}
                                    >
                                        {item.category}
                                    </span>

                                    <h5 className="card-title text-dark fw-bold mb-1 text-truncate" style={{ fontSize: '1.15rem' }}>{item.title}</h5>

                                    <p className="card-text text-muted flex-grow-1" style={{ fontSize: "0.85rem", minHeight: '35px' }}>
                                        {item.description.length > 50
                                            ? item.description.substring(0, 50).trim() + "..."
                                            : item.description}
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                        <span className="fw-bolder fs-4" style={{ color: '#007bff' }}>${item.price.toFixed(2)}</span>

                                        <button
                                            className="btn btn-dark shadow-sm px-4 fw-semibold"
                                            style={{
                                                background: 'linear-gradient(45deg, #1f1f1f, #5a5a5a)',
                                                border: 'none'
                                            }}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <i className="bi bi-bag-fill me-2"></i>Thêm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
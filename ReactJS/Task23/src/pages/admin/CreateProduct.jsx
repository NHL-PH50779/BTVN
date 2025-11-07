import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, updateProduct, getProductDetail } from "../../api/apiProduct";
import { getCategories } from "../../api/apiCategory";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
    title: z.string().min(3, "Tên sản phẩm phải có ít nhất 3 ký tự").nonempty("Không được để trống"),
    price: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number({ invalid_type_error: "Giá phải là số" }).min(0, "Giá phải >= 0")
    ),
    categoryId: z.string().nonempty("Phải chọn danh mục"),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    stock: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number({ invalid_type_error: "Số lượng phải là số" }).min(0, "Số lượng phải >= 0")
    ),
});

const CreateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            price: 0,
            categoryId: "",
            description: "",
            thumbnail: "",
            stock: 0,
        },
    });

    useEffect(() => {
        (async () => {
            const catData = await getCategories();
            setCategories(catData || []);

            if (id) {
                const data = await getProductDetail(id);
                reset({
                    title: data.title ?? "",
                    price: data.price ?? 0,
                    categoryId: data.categoryId ?? "",
                    description: data.description ?? "",
                    thumbnail: data.thumbnail ?? "",
                    stock: data.stock ?? 0,
                });
            } else {
                reset({
                    title: "",
                    price: 0,
                    categoryId: "",
                    description: "",
                    thumbnail: "",
                    stock: 0,
                });
            }
        })();
    }, [id, reset]);

    const onSubmit = async (values) => {
        try {
            if (id) {
                await updateProduct(id, values);
                alert("Cập nhật sản phẩm thành công!");
            } else {
                await createProduct(values);
                alert("Thêm sản phẩm thành công!");
            }
            navigate("/admin/products");
        } catch (err) {
            console.error("Lỗi khi lưu sản phẩm:", err);
            alert("Không thể lưu sản phẩm!");
        }
    };

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "40px auto",
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                padding: 30,
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
                {id ? "✏️ Cập nhật sản phẩm" : "🛍️ Thêm sản phẩm mới"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div style={{ marginBottom: 15 }}>
                    <label>Tên sản phẩm</label>
                    <input
                        {...register("title")}
                        placeholder="Nhập tên sản phẩm"
                        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                    />
                    {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label>Giá</label>
                    <input
                        type="number"
                        {...register("price")}
                        placeholder="Nhập giá sản phẩm"
                        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                    />
                    {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label>Danh mục</label>
                    <select
                        {...register("categoryId")}
                        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p style={{ color: "red" }}>{errors.categoryId.message}</p>}
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label>Mô tả</label>
                    <textarea
                        {...register("description")}
                        placeholder="Mô tả sản phẩm (không bắt buộc)"
                        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label>Hình ảnh (URL)</label>
                    <input
                        {...register("thumbnail")}
                        placeholder="https://example.com/image.jpg"
                        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label>Số lượng trong kho</label>
                    <input
                        type="number"
                        {...register("stock")}
                        placeholder="Nhập số lượng"
                        style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
                    />
                    {errors.stock && <p style={{ color: "red" }}>{errors.stock.message}</p>}
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                        }}
                    >
                        {id ? "Cập nhật" : "Thêm mới"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        style={{
                            backgroundColor: "#ccc",
                            color: "#333",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                        }}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;

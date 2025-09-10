const API_URL = "http://localhost:3000/products";

const productForm = document.getElementById("productForm");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const productTableBody = document.querySelector("#productTable tbody");
const editIndexInput = document.getElementById("editIndex");
const submitBtn = document.getElementById("submitBtn");

const nameError = document.getElementById("nameError");
const priceError = document.getElementById("priceError");

function fetchProducts() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => index(data))
    .catch((err) => console.error("Lỗi khi load sản phẩm:", err));
}

function index(products) {
  productTableBody.innerHTML = "";
  products
    .slice()
    .reverse()
    .forEach((p) => {
      const row = `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>
          <button class="action-btn edit" onclick="update(${p.id}, '${p.name}', ${p.price})">Sửa</button>
          <button class="action-btn delete" onclick="deleteP(${p.id})">Xoá</button>
        </td>
      </tr>
    `;
      productTableBody.innerHTML += row;
    });
}

function validate(name, price) {
  let valid = true;

  nameError.textContent = "";
  priceError.textContent = "";

  if (!name || name.trim().length < 3) {
    nameError.textContent = "Tên sản phẩm phải >= 3 ký tự và không để trống";
    valid = false;
  }

  if (!price || price <= 1) {
    priceError.textContent = "Giá phải > 1 và không được âm";
    valid = false;
  }

  return valid;
}

productForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const editId = editIndexInput.value;

  if (!validate(name, price)) return;

  const productData = { name, price };

  if (editId === "") {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then(() => {
        nameInput.value = "";
        priceInput.value = "";
        fetchProducts();
      })
      .catch((err) => console.error("Lỗi khi thêm:", err));
  } else {
    fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then(() => {
        editIndexInput.value = "";
        submitBtn.textContent = "Thêm sản phẩm";
        nameInput.value = "";
        priceInput.value = "";
        fetchProducts();
      })
      .catch((err) => console.error("Lỗi khi cập nhật:", err));
  }
});

function update(id, name, price) {
  nameInput.value = name;
  priceInput.value = price;
  editIndexInput.value = id;
  submitBtn.textContent = "Cập nhật";
}

function deleteP(id) {
  if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => fetchProducts())
      .catch((err) => console.error("Lỗi khi xoá:", err));
  }
}

fetchProducts();

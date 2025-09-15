const products = [
  {
    name: "Sony Playstation 5",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/playstation_5_tywoqq.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739038/samsung_galaxy_iad0cv.png",
    type: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739063/cannon_eos_camera_ydidrx.png",
    type: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/sony_a7_camera_xvkxwd.png",
    type: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739061/lg_tv_yl0k03.png",
    type: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739061/nintendo_switch_diq6cy.png",
    type: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/xbox_series_x_e9yex6.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/samsung_tv_adpfag.png",
    type: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739064/google_pixel_r2bpdo.png",
    type: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/sony_zv1f_camera_o7kt3t.png",
    type: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/toshiba_tv_sdsrnz.png",
    type: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739062/iphone_14_fhu2gq.png",
    type: "smartphones",
    price: 999.99,
  },
];

const productList = document.getElementById("productList");
const categoryCheckboxes = document.querySelectorAll(".category");
const sortSelect = document.getElementById("sortPrice");
const searchInput = document.getElementById("search");

function renderProducts(list) {
  productList.innerHTML = "";
  if (list.length === 0) {
    productList.innerHTML = "<p>Không tìm thấy sản phẩm nào</p>";
    return;
  }
  list.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
          <img src="${p.url}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p>Giá: $${p.price.toFixed(2)}</p>
          <p>Danh mục: ${p.type}</p>
        `;
    productList.appendChild(div);
  });
}

function filterAndRender() {
  let filtered = products.slice();

  const selectedCategories = Array.from(categoryCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) => selectedCategories.includes(p.type));
  }

  const searchValue = searchInput.value.toLowerCase();
  if (searchValue) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchValue)
    );
  }

  if (sortSelect.value === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}
categoryCheckboxes.forEach((cb) =>
  cb.addEventListener("change", filterAndRender)
);
sortSelect.addEventListener("change", filterAndRender);
searchInput.addEventListener("input", filterAndRender);
renderProducts(products);

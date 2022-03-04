const productTableBody = document.querySelector(".admin-products-table");
const addNewProductBtn = document.querySelector(".add-new-product");
const updateProductBtn = document.querySelector(".update-product");

const productsAPI = "https://61e0713b63f8fc0017618793.mockapi.io/Products";

window.addEventListener("load", getAllProducts);

async function getAllProducts() {
  const result = await fetch(productsAPI);
  const products = await result.json();

  const tableRows = products
    .map(
      (product) =>
        `<tr>
               <th scope="row">${product.id}</th>
               <td><img src=${product.imgURL} style="height: 100px;"/></td>
               <td>${product.productName} </td>
               <td>${product.productPrice}$</td>
               <td><button class="btn btn-danger delete fa-solid fa-x" data-product-id=${product.id}>
               </button></td>
               <td><button class="btn btn-success edit fa-solid fa-pen-to-square" data-product-id=${product.id}>
               </button></td>
            </tr>`
    )
    .join("");

  productTableBody.innerHTML = tableRows;
}

productTableBody.addEventListener("click", handleProducts);

async function handleProducts(event) {
  const productId = event.target.getAttribute("data-product-id");
  if (event.target.classList.contains("delete")) {
    let response = await fetch(`${productsAPI}/${productId}`, {
      method: "DELETE",
    });
    console.log(response);
    getAllProducts();
  } else if (event.target.classList.contains("edit")) {
    console.log("edit", productId);
    editProductById(productId);
  }
}

addNewProductBtn.addEventListener("click", addNewProduct);

async function addNewProduct(event) {
  event.preventDefault();

  const newProductName = document.getElementById("name").value;
  const newProductPrice = document.getElementById("form-price").value;
  const newProductImageURL = document.getElementById("form-image").value;

  let response = await fetch(productsAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productName: newProductName,
      productPrice: newProductPrice,
      imgURL: newProductImageURL,
    }),
  });

  let product = await response.json();
  console.log("newProduct", product);

  let newProductTableRow = `<tr>
         <th scope="row">${product.id}</th>
         <td><img src=${product.imgURL}}/></td>
         <td>${product.productName}</td>
         <td>${product.productPrice}</td>
        <td><button class="btn btn-danger delete fa-solid fa-x" data-product-id=${product.id}>
         </button></td>
         <td><button class="btn btn-success edit fa-solid fa-pen-to-square" data-product-id=${product.id}>
         </button></td>
      </tr>`;

  productTableBody.innerHTML += newProductTableRow;
}

updateProductBtn.addEventListener("click", updateProduct);

async function updateProduct(event) {
  event.preventDefault();

  const productName = document.getElementById("name").value;
  const productPrice = document.getElementById("form-price").value;
  const productImageURL = document.getElementById("form-image").value;
  const productId = document.getElementById("productId").value;

  let response = await fetch(`${productsAPI}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImageURL,
    }),
  });

  let data = await response.json();
  console.log(data);
  getAllProducts();
}

async function editProductById(productId) {
  const productNameElement = document.getElementById("name");
  const productPriceElement = document.getElementById("form-price");
  const productImageElement = document.getElementById("form-image");
  const productIdHiddenElement = document.getElementById("productId");

  let response = await fetch(`${productsAPI}/${productId}`);
  let product = await response.json();

  productNameElement.value = product.productName;
  productPriceElement.value = product.productPrice;
  productImageElement.value = product.imgURL;
  productIdHiddenElement.value = product.id;
}

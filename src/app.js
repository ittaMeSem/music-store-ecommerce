const fetchProductsAPI = document.getElementById("details");

fetchProductsAPI.addEventListener("click", getProducts);

function getProducts() {
  fetch("https://61e0713b63f8fc0017618793.mockapi.io/Products")
    .then((result) => result.json())
    .then((data) => console.log(data));
}

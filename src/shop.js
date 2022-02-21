window.addEventListener("load", async () => {
  const productsAPI = "https://61e0713b63f8fc0017618793.mockapi.io/Products";
  const result = await fetch(productsAPI);
  const products = await result.json();

  const productContainer = document.querySelector(".product-container");

  const cards = products
    .map(
      (product) =>
        `<div class = "product-card";">
        <div class = "card-contents">
            <img src="${product.imgURL}" /> 
            <h3>${product.productName}</h3>
            <h4>${product.productPrice}</h4>
            <a href="details.html?product-id=${product.id}">DETAILS</a>
        </div>
    </div>`
    )
    .join("");
  productContainer.innerHTML = cards;
});

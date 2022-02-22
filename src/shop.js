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
            <h3>${product.productPrice}$</h3>
            <div class="card-buttons">
            <button id="add-to-cart"><span data-product-id=${product.id}>Add to cart</span></button>
            <a href="details.html?product-id=${product.id}" id="details" role="button"><span>Details</span></a>
            </div>
          </div>
    </div>`
    )
    .join("");
  productContainer.innerHTML = cards;
});

document
  .querySelector(".product-container")
  .addEventListener("click", addToCart);
async function addToCart(event) {
  const addToCartBtn = event.target;
  let productId = addToCartBtn.getAttribute("data-product-id");

  const productAPI = `https://61e0713b63f8fc0017618793.mockapi.io/Products/${productId}`;
  const result = await fetch(productAPI);
  const product = await result.json();

  let cart = [];
  if (localStorage.getItem("cart") == null) {
    cart.push({ ...product, noOfProducts: 1 });
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
    const productInCart = cart.find(
      (productFromCart) => productFromCart.id == product.id
    );
    if (productInCart != undefined) {
      productInCart.noOfProducts++;
      console.log("Product already in cart");
    } else {
      const productToBeAddedInCart = { ...product, noOfProducts: 1 };
      cart.push(productToBeAddedInCart);
      console.log("Product successfully added to cart");
    }
  }

  console.log(cart);
  if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart));
}

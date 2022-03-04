window.addEventListener("load", async () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);
  const productId = searchParam.get("product-id");

  const productAPI = `https://61e0713b63f8fc0017618793.mockapi.io/Products/${productId}`;
  const result = await fetch(productAPI);
  const product = await result.json();

  const productCard = `
		<div class="details-card">
			<div class="card-image">
          <img src="${product.imgURL}"/>
      </div>
      <div class="card-body">
	  			  <h2 class="card-title">${product.productName}</h2>
	  			  <h3 class="card-price">${product.productPrice}$</h3>
          <div class= "card-body-btn"
	  			  <button id="add-to-cart"><span data-product-id=${product.id}>Add to cart</span></button>
          </div>
      </div>
 		</div>`;

  document.querySelector(".product-details").innerHTML = productCard;
});

document.querySelector(".product-details").addEventListener("click", addToCart);
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

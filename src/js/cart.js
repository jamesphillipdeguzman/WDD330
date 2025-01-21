import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.image}"
      alt="${item.brand}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.brand}</h2>
  </a>
  <p class="cart-card__color">${item.colors}</p> 
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.price}</p>
</li>`;

  return newItem;
}

renderCartContents();

function showCartTotal() {
  // const cartItems = document.querySelector("#cart-footer");
  const cartTotal = document.querySelector(".cart-total");
  if (!getLocalStorage("cart")) {
    // hide the total
    cartTotal.classList.add(".cart-footer-hide");
  } else {
    // show the total
    cartTotal.classList.remove(".cart-footer-hide");

    let cart = getLocalStorage("cart");

    // Get temp array and convert price to decimal using parseFloat
    let temp = cart.map((item) => parseFloat(item.price));

    // Get total price using reduce method
    let totalPrice = temp.reduce((prev, next) => prev + next, 0);

    cartTotal.textContent = `Total: $${totalPrice}`;
  }
}

showCartTotal();

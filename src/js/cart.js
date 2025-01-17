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


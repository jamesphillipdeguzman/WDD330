// ShoppingCart - Utilized by the cart's index.html to manage the shopping cart functionality.
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item, index) {
  const imageSrc = item.Images?.PrimaryMedium || item.Images?.PrimarySmall || "default-image.jpg";

  return `<li class="cart-card divider">
      <span data-index="${index}" class="remove-item" style="color: red; cursor: pointer;">X</span>
      <a href="#" class="cart-card__image">
          <img src="${imageSrc}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>  
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
    </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.cartItems = [];
  }

  // ✅ New init() function to initialize cart
  init() {
    this.cartItems = getLocalStorage(this.key) || [];
    this.renderCartContents();
    this.attachRemoveListeners();
    this.showCartTotal();
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    const productListEl = document.querySelector(this.parentSelector);

    if (!productListEl) {
      console.error(`Element ${this.parentSelector} not found.`);
      return;
    }

    // Generate HTML for each cart item
    productListEl.innerHTML = cartItems.map((item, index) =>
      cartItemTemplate(item, index)
    ).join("");
  }

  attachRemoveListeners() {
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemIndex = event.target.dataset.index;
        this.removeItemFromCart(itemIndex);
      });
    });
  }

  removeItemFromCart(itemIndex) {
    let cartItems = getLocalStorage(this.key) || [];
    
    if (itemIndex < cartItems.length) {
      cartItems.splice(itemIndex, 1);
      setLocalStorage(this.key, cartItems);
      this.renderCartContents();
      this.attachRemoveListeners();
      this.showCartTotal();
    }
  }

  showCartTotal() {
    const cartTotal = document.querySelector(".cart-total");
    if (!cartTotal) return;

    let cart = getLocalStorage(this.key) || [];
    let totalPrice = cart.reduce((total, item) => {
      return total + (item.FinalPrice * (item.quantity || 1));
    }, 0);

    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
}

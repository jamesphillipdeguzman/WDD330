import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <span data-id="${item.cartItemId}" class="remove-item" style="color: red; cursor: pointer;">X</span>
      <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img
          src="${item.Images?.PrimaryMedium || "placeholder.jpg"}"
          alt="${item.Name || "Product Image"}"
        />
      </a>
      <a href="/product_pages/index.html?product=${item.Id}">
        <h2 class="card__name">${item.Name || "Unnamed Product"}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "Default Color"}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.ListPrice?.toFixed(2) || "0.00"}</p>
    </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key; // Local storage key
    this.parentSelector = parentSelector; // Selector for the parent container
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    const productListEl = document.querySelector(this.parentSelector);

    // Clear existing content
    productListEl.innerHTML = "";

    if (cartItems.length === 0) {
      // Handle empty cart
      productListEl.innerHTML = "<p>Your cart is empty.</p>";
      this.calculateTotal([]); // Hide the total
      return;
    }

    // Generate HTML for each cart item
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productListEl.innerHTML = htmlItems.join("");

    // Attach event listeners to remove buttons
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const cartItemId = event.target.dataset.id; // Get cartItemId from data-id attribute
        this.removeItemFromCart(cartItemId); // Remove the specific item
      });
    });

    // Calculate and display the total
    this.calculateTotal(cartItems);
  }

  removeItemFromCart(cartItemId) {
    // Retrieve the cart from local storage
    let cartItems = getLocalStorage(this.key) || [];

    // Filter out the item with the specific cartItemId
    cartItems = cartItems.filter((item) => item.cartItemId !== cartItemId);

    // Save the updated cart back to local storage
    setLocalStorage(this.key, cartItems);

    // Re-render the cart
    this.renderCartContents();
  }

  calculateTotal(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + (item.ListPrice || 0), 0);
  
    // Ensure the total is displayed in the correct element
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotalEl = document.getElementById("cart-total");
  
    if (cartFooter && cartTotalEl) {
      if (cartItems.length > 0) {
        cartFooter.classList.remove("hide"); // Show the footer
        cartTotalEl.textContent = total.toFixed(2); // Update the total
      } else {
        cartFooter.classList.add("hide"); // Hide the footer if no items
      }
    }
  }
  
}

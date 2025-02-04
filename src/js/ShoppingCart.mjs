// ShoppingCart - Utilized by the cart's index.html to manage the shopping cart functionality.
import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function cartItemTemplate(item, index) {
  // Use the PrimaryMedium image if available, otherwise use PrimarySmall 
  const imageSrc = item.Images.PrimaryMedium || item.Images.PrimarySmall;

  return `<li class="cart-card divider">
      <span data-index="${index}" class="remove-item" style="color: red; cursor: pointer;">X</span>
      <a href="#" class="cart-card__image">
          <img 
          src="${imageSrc}" 
          alt="${item.Name}" 
          />
      </a>
      <a href="#">
      <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>  
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
    </li>`;
}

document.addEventListener("DOMContentLoaded", () => {
  function renderCartContents() {
    const cartItems = getLocalStorage("cart");

    const productListEl = document.querySelector("#cart-items");

    // Clear the existing cart items
    productListEl.innerHTML = "";

    // Generate HTML for each cart item, passing the index to cartItemTemplate
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index),
    );

    productListEl.innerHTML = htmlItems.join("");

    // Attach event listeners to all "X" buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const itemIndex = this.dataset.index; // Get the index from the data-index attribute
        removeItemFromCart(itemIndex); // Remove the item from the cart
        // Hide checkout button and cart total
        const cart = getLocalStorage("cart");
        if (cart.length === 0) {
          const cartTotal = document.querySelector(".cart-total");
          const checkoutBtn = document.querySelector(".checkout");
          cartTotal.classList.remove("show");
          checkoutBtn.classList.remove("show");
        }


      });
    });
  }

  function removeItemFromCart(itemIndex) {
    const cartItems = getLocalStorage("cart");

    // Remove the item at the specific index
    cartItems.splice(itemIndex, 1);

    // Save the updated cart back to local storage
    setLocalStorage("cart", cartItems);

    // Re-render the cart
    renderCartContents();

    // Update the Cart Total
    showCartTotal();
  }

  function showCartTotal() {
    const cartTotal = document.querySelector(".cart-total");

    if (!cartTotal) {
      console.error("Cart total element not found.");
      return;
    }

    if (!getLocalStorage("cart")) {
      // hide the total
      cartTotal.classList.add(".cart-footer-hide");
    } else {
      // show the total
      cartTotal.classList.remove(".cart-footer-hide");

      let cart = getLocalStorage("cart");

      // Get temp array and convert price to decimal using parseFloat
      let temp = cart.map((item) => parseFloat(item.FinalPrice * item.quantity || 1));

      // Get total price using reduce method
      let totalPrice = temp.reduce((prev, next) => prev + next, 0);

      cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
  }

  // Initial render of cart contents
  renderCartContents();
  showCartTotal();
});

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    debugger;
    const cartItems = getLocalStorage(this.key);
    const checkoutBtn = document.querySelector("#checkout-btn");
    const cartTotal = document.querySelector(".cart-total");

    if (cartItems.length > 0) {
      checkoutBtn.classList.add("show");
      cartTotal.classList.add("show");
    } else {
      checkoutBtn.classList.remove("show");
      cartTotal.classList.remove("show");
    }
    const productListEl = document.getElementById(this.parentSelector);

    // Generate HTML for each cart item, passing the index to cartItemTemplate
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index)
    ).join("");

    productListEl.innerHTML = htmlItems;
  }
}

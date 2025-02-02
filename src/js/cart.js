import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
  showCartTotal,
} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
        <span data-index="${index}" class="remove-item" style="color: red; cursor: pointer;">X</span>
        <a href="#" class="cart-card__image">
            <img src="${item.Images.PrimaryMedium}" alt="${item.NameWithoutBrand}" />
        </a>
        <h2 class="card__name">${item.NameWithoutBrand}</h2>
        <p class="cart-card__quantity">qty: ${item.quantity}</p>
        <p class="cart-card__price">$${(item.FinalPrice * item.quantity).toFixed(2)}</p>
    </li>`;
}

const cart = new ShoppingCart("cart", "cart-items");
cart.renderCartContents();
const productListEl = document.querySelector("#cart-items");
// Clear the existing cart items
productListEl.innerHTML = "";

const cartItems = getLocalStorage("cart");

// Generate HTML for each cart item, passing the index to cartItemTemplate
const htmlItems = cartItems
  .map((item, index) => cartItemTemplate(item, index))
  .join("");

productListEl.innerHTML = htmlItems;

// Attach event listeners to all "X" buttons
document.querySelectorAll(".remove-item").forEach((button) => {
  debugger;
  button.addEventListener("click", function () {
    const itemIndex = this.dataset.index; // Get the index from the data-index attribute
    removeItemFromCart(itemIndex); // Remove the item from the cart
  });
});

function removeItemFromCart(itemIndex) {
  const cartItems = getLocalStorage("cart");

  // Remove the item at the specific index
  cartItems.splice(itemIndex, 1);

  // Save the updated cart back to local storage
  setLocalStorage("cart", cartItems);

  // Re-render the cart
  cart.renderCartContents();

  // Update the Cart Total
  showCartTotal();
}

// Listen for checkout
debugger;

function checkoutCart() {
  const checkoutBtn = document.querySelector("#checkout-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "../checkout/index.html";
    });
  }
}

// Initialize the checkout event listener
checkoutCart();

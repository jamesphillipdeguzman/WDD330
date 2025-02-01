import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const cart = new ShoppingCart("cart", "#cart-items"); // ✅ Ensure correct arguments
  cart.init(); // ✅ Call the newly added init function

  // Ensure checkout button works
  function checkoutCart() {
    const checkoutBtn = document.querySelector("#checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        window.location.href = "../checkout/index.html";
      });
    }
  }

  checkoutCart(); // Attach event listener
});

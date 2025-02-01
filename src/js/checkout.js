import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary"); // Ensure selector exists
myCheckout.init();

// Ensure zip field exists before attaching event
const zipInput = document.querySelector("#zipcode"); // Use correct ID
if (zipInput) {
  zipInput.addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
}

// Ensure checkout button exists before attaching event
const checkoutButton = document.querySelector("#btn-checkout"); // Updated selector
if (checkoutButton) {
  checkoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    myCheckout.checkout();
  });
}
